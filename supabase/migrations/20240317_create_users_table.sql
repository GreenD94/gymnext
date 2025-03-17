-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  phone varchar(20) not null unique,
  role varchar(20) not null check (role in ('client', 'trainer', 'admin', 'super_admin')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create policies
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Service role can manage all profiles" on public.users
  using (auth.jwt()->>'role' = 'service_role');

-- Create function to handle user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, phone, role)
  values (new.id, new.raw_user_meta_data->>'phone', 'client');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 
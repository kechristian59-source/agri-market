create extension if not exists pgcrypto;

create table if not exists users (
 id uuid primary key default gen_random_uuid(),
 role text not null check(role in ('producer','buyer','processor','admin')),
 full_name text not null,
 phone text unique not null,
 email text unique,
 password_hash text not null,
 province text,
 district text,
 sector text,
 cell text,
 village text,
 verified boolean not null default false,
 verification_status text not null default 'Pending' check(verification_status in ('Pending','Verified','Rejected')),
 rejection_reason text,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);

create table if not exists otp_codes (
 id uuid primary key default gen_random_uuid(),
 user_id uuid references users(id) on delete cascade,
 phone text not null,
 code_hash text not null,
 purpose text not null check(purpose in ('signup','login','reset')),
 expires_at timestamptz not null,
 attempts integer not null default 0,
 consumed_at timestamptz,
 created_at timestamptz not null default now()
);
create index if not exists otp_phone_purpose_idx on otp_codes(phone,purpose,created_at desc);

create table if not exists products (
 id uuid primary key default gen_random_uuid(), owner_user_id uuid references users(id),
 product_name text not null, quantity numeric not null check(quantity>0), unit text not null,
 price numeric not null check(price>=0), province text not null, district text not null,
 sector text not null, cell text not null, village text not null, availability text not null,
 quality text not null, harvest_date date not null, description text not null,
 status text not null default 'Available', created_at timestamptz not null default now()
);
create index if not exists products_search_idx on products(product_name,province,district,status);

create table if not exists buyer_requests (
 id uuid primary key default gen_random_uuid(), buyer_user_id uuid references users(id),
 product_name text not null, quantity numeric not null check(quantity>0), unit text not null,
 location text not null, max_price numeric, needed_date date not null, quality text not null,
 requirements text, status text not null default 'Open', created_at timestamptz not null default now()
);
create index if not exists requests_search_idx on buyer_requests(product_name,status,needed_date);

create table if not exists offers (
 id uuid primary key default gen_random_uuid(), request_id uuid references buyer_requests(id),
 product_id uuid references products(id), sender_user_id uuid references users(id),
 quantity numeric not null, unit text not null, price numeric not null, delivery_date date not null,
 terms text not null, status text not null default 'Pending', created_at timestamptz not null default now()
);
create table if not exists orders (
 id uuid primary key default gen_random_uuid(), offer_id uuid references offers(id), buyer_user_id uuid references users(id),
 seller_user_id uuid references users(id), quantity numeric not null, unit text not null,
 total_amount numeric not null, fulfilment_method text not null check(fulfilment_method in ('Delivery','Pickup')),
 status text not null default 'Pending', created_at timestamptz not null default now()
);
create table if not exists payments (
 id uuid primary key default gen_random_uuid(), order_id uuid unique references orders(id),
 method text not null check(method in ('Mobile Money','Bank','Cash')), amount numeric not null,
 reference_id text, status text not null default 'Pending', paid_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists reviews (
 id uuid primary key default gen_random_uuid(), order_id uuid references orders(id), reviewer_user_id uuid references users(id),
 rating integer not null check(rating between 1 and 5), comment text not null, created_at timestamptz not null default now(),
 unique(order_id,reviewer_user_id)
);
create table if not exists audit_logs (
 id uuid primary key default gen_random_uuid(), actor_user_id uuid, action text not null, record_type text not null,
 record_id text not null, result text not null, created_at timestamptz not null default now()
);


create table if not exists processing_companies (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 crop text not null,
 location text not null default '',
 contact text not null default '',
 processed_products text[] not null default '{}',
 notes text not null default '',
 verified boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists processing_companies_crop_idx on processing_companies(crop, name);

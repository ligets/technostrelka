

--
-- Database "account_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 15.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: account_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE account_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE account_db OWNER TO postgres;

\connect account_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: confirm_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.confirm_session (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.confirm_session OWNER TO postgres;

--
-- Name: refresh_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.refresh_session (
    refresh_token uuid NOT NULL,
    access_token character varying NOT NULL,
    expires_in integer NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.refresh_session OWNER TO postgres;

--
-- Name: reset_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reset_session (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL
);


ALTER TABLE public.reset_session OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    email character varying NOT NULL,
    first_name character varying NOT NULL,
    hashed_password character varying(1024) NOT NULL,
    is_verify boolean NOT NULL,
    is_deleted boolean NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
78b0703cb388
\.


--
-- Data for Name: confirm_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.confirm_session (id, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: refresh_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.refresh_session (refresh_token, access_token, expires_in, user_id, created_at) FROM stdin;
4ef1393d-017f-429d-ab1f-0815f6cfee31	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODk1YTdmNi01YjRkLTQ3OTItYTdlOS0xMjFkNmU5YzhlYjYiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjE4NTB9.VRiirQIDN7l5CHrg9mm--lTDsKvEvYVfi6zXjFCLYjMBVcyrGDpio86skiGHDlqZAkxBZzolCDm0VJzo0D-inlGAWwXnZIWBE_8TiJFKeIKhDsuhhfWTh1yOwCll91-v_ByU07Iny72avFKByhdUXQ3aRRx1RJsObNWmgnuVrgylAhNQWoGhp5T4a5d1sS1LnZFUKiM0SYehG5wEpsckfNWOeBBkgySUJgo7XCBEtWZncYyd5ZeTf_Cmxe2Nvo7Z80vbmJyCEFUDi4AWXa2KLtmu1-Y3njmK490ENjRwhfFV8RWzKs8hxsypp5g16OSnxPDrLsrS3gA0SipPUeMFaw	2592000	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	2025-02-28 16:42:30.366379+00
9aafea8c-96db-45da-854d-efe7249641f4	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODk1YTdmNi01YjRkLTQ3OTItYTdlOS0xMjFkNmU5YzhlYjYiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjE4NzB9.BzR3SQMkj95NvjOCFsd4vasav86hikiOwB-GfUrDqoN0LwHNpyezchBlvqDs19To-XtS5Rd1A-4pYcZZH0a-XFrv_op3OGhaA4TPTeb9mBxWVeaFV-Ijs_yzFgyUFHyWsdzoMUMcMbNMlU7wIKr9m4sP_afJ0bMouA12eZBJQSJnRm0uNL4m5gUlaEEe_g9OywZ8dbRv0KfkHWkRTP4csVbw_QIMWgTKtNdJW1WiZ_GeMn-B_8-5E-eAFZ_GO0swupDVzzhx02_AColeuDArTkY_6ds7oLRBx5AiizVBteMuhmlIrUDckJQJBJxl1LuSSBGFKBK7exnA90TWY1ivKg	2592000	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	2025-02-28 16:42:50.595642+00
eed11f1b-de56-4130-b5c0-181baf4dc180	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTgwZTM2ZS1mZDRhLTRjYTUtYmRiMy0yNmNjNjZmYWQzNDQiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjIxNTZ9.NUrgneXV6FZhiuKeVd7q2t7S_IDLASazBGOgp8jhYt21uDhpkMxe6ed6iD3zhszXf1R4gECfRPuJEIqRzXCRGBb2xg6aDm-CHFajBDPdlsGTAiq25ToNDbCf_8qphazflf4SDZKTqR4OG_1uSqoUehKeESYodmzojgFzwpEFV34PJJLTUFSE28GcZ1j_5-smZUHnDY6MLDbZpQotomSVpdxz-FrWDGefXis5DraMy4Y4B6aAF4NGple8xvgX-Ja8kZsafB89kRaRQv9toLljoH2HaRx5WY-xlq0_o4kdPTa3eyHOjTFOQBZ4doQC9ZlvlOvZELNcl2F29IP4o7AcYA	2592000	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	2025-02-28 16:47:36.46365+00
0c783608-dbbc-4d74-8544-9c3aa5906e88	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTI5Y2Q3Zi1mNjBiLTRlMDUtYmRkOC1hZDFkZGEzZjYwMTEiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjIxNzd9.X4TvcE44BG4Rm8ujRfR6izGKidaD2XeEi6bG266Drl2p8XTK8BQgTXELppgLWnBgkxTtIJVf90xF0bt1P-pKJJ85xU_nIcunjUEzhxGoXaZGctDddf9dW2HGnCzEwOUFhdA9OhUoom4zOxzZV7_vH9DWTd3wWoqJSq9W-yVe5LsiGTPyhIDb1rC5ib3rzh00hAjY-OYxj53o5Wykg7ZVUjQk8BhAhgeTIaiL_mu-gZZPldv0Yvyr-ILMbIqj2xUCETGSwJPVVQcYF-aMEq4_eWG6_WOWxuDFrEMmlS6oPPZj7ICFbq291nlbA-T192yqbxZmOsEP5nnEfp-IeOUaew	2592000	d129cd7f-f60b-4e05-bdd8-ad1dda3f6011	2025-02-28 16:47:57.678769+00
35ef228c-fe94-46bd-93a4-b9e200323c0d	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODk1YTdmNi01YjRkLTQ3OTItYTdlOS0xMjFkNmU5YzhlYjYiLCJyb2xlIjoiQWRtaW4iLCJpc19kZWxldGVkIjpmYWxzZSwiZXhwIjoxNzQwNzYyNDU1fQ.FlRHhsa2j9BgM_56Nud7h1vhicul4cEH9jaLzSV5yE8Zj5TvL0ahNTBQreONzbOX3iJB8O7IlMk1XZ7bgx-oNfbxFceluW9z2hy0CaDOM-rof08qdjIQK3PrmvcmknUSnyWCLRcOPPeH1zQQloHs8TWew_TZeX5RSMLp9RiYN7Lo0ponU-0tiX-NNZOxCc6iyO62NdRdgVHEy-UARcJi0L4k61auu0caEGak1185Rjlr50yAipln2itx3ZUc1p4GmnCPS4j6bQHNIUqcIynpqmLNi9CRpcLKdj-R1QkC1t2McMGJSQFS78TNjLhzyR_zxDGINPwiV05Zh6VD0seCpw	2592000	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	2025-02-28 16:52:35.000157+00
454374a5-dfe4-433a-967f-511f3fdd87ec	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTgwZTM2ZS1mZDRhLTRjYTUtYmRiMy0yNmNjNjZmYWQzNDQiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjI4MzV9.fP24OPrqOp9wKgCxx0kWMZ1ePxiWWTIQR4v3M3OHJRqBl0XNDMy6EYcaADTO9lnR4T0suScWnPK11rIxUvBg4B70tTVLxcCb7a9mo227_G7jTzH8dgeA8KTpu65QBBnKGD0_hBqlyamyKtxOPbQtapZzYLWfJaF7iM1yNS4jDAhKDOy6sfAGtVVySe5BfWcZgOs6RoH6gARiVwTJpKpc1sJeN0mpniflbyH62oOIo6-M6TIjeA-QVryjNzlq9nx-KmhZVKnhNfI-Mg253s6NHkUOfUYNJ5QbQW5AVFNMm9llZKokWVQC52lA6hlOKICEAvaUF0kmf8bhckFXmzalFA	2592000	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	2025-02-28 16:58:55.185358+00
9afd8ac6-592d-4834-aa50-eaae9b9b4d60	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlODk1YTdmNi01YjRkLTQ3OTItYTdlOS0xMjFkNmU5YzhlYjYiLCJyb2xlIjoiQWRtaW4iLCJpc19kZWxldGVkIjpmYWxzZSwiZXhwIjoxNzQwNzYzMDMwfQ.Y-OscN20dVnmLeUbfY5RWMaHCjTMylYtBoaV5qvDpnOL8mKdO57yC6LKvguosgG0kKX8ILMNkSecwJASSk4CtH6ZzXAj5n9mvQHzZ4P67tMKyDrfWmWNUMER6UiB-jVd5jZVOcYq3kS2IbXmZRdlSAj_9X7wtNIi1FvFl8BNF2BM56YOuvtDzz1oxKx38mL0S74Atc6rBbtymMjiqusD7loYpOFrtDP7pbKMBwtQi7zTduIzfvrhk4ZofYMfjxF9SaPTPi34Xckb2bkqj3xUmFlhDQzIUbFYlaFt4aVB7VjPU5Ho1jre7TeVC-FTiYO62mUZ-91doQKE9ERuGKVs-w	2592000	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	2025-02-28 17:02:10.335677+00
b66e95da-24c2-4189-b3f3-286df4174811	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwZTgwZTM2ZS1mZDRhLTRjYTUtYmRiMy0yNmNjNjZmYWQzNDQiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjMzNjB9.NzmsYnUEnfPBvQCuTMgi90_dW1fUm__J73i-JgE92xPZmOCE6tIcKtBfixRZIEfgAGIoDrGwg-k4QzCCORPhPQm-Sk8nQu5dl6TP9c3qPUctw3pU6TRlDhRLdcA0GDdRWUOgyt6aY3mrTJkQuWoUgPHlxgg4aqt8VaXLJy-y904LO_gw3FFKL4zWK8lIJp-M1k5Kyoo3qOQZSnQxg1JiYJJPRgeYn6Xr75l4bgOFvHT6EfXG1sQB1nATn-pvw_Q3trw6XLcEF5DJ9R9I-ktDifJGiaS6F7X9l0bksHPWwLdrt74E8g_tVgk_zCliMZyyJxYxYRpNi9g2i-OHpEjLKw	2592000	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	2025-02-28 17:07:40.514781+00
962b6f99-c119-4112-a05f-ace2001c927b	eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkMTI5Y2Q3Zi1mNjBiLTRlMDUtYmRkOC1hZDFkZGEzZjYwMTEiLCJyb2xlIjoiVXNlciIsImlzX2RlbGV0ZWQiOmZhbHNlLCJleHAiOjE3NDA3NjM0OTF9.O_YpwIre3hOzrDXnUwAHqCuKAoYqZb0dKQj1oX1E0SaPaQWNMTDRXgVF2rMhHJaVSI8aVSHnIkmAHDM_zqgXM29xiF4oCPjTVzRp1sB7O_nifhZ5axqMrFYGT9E4L45viKBZX5CXLNO20hAasixlE8PnSVzg2CfXQx1btumAEeOWQfCnFlPK5_0aDpoBSIqmjwwt5PYp0VtL1DMoFIl4wQ5Pd8XAJYFs_FoPvud7ffB3p50n8Rd_G3Xu6Egf0ybH2-Om1YbafyoRRYOCUXFx0luSQ3b88BLmJFaYZo9ZyZA_Zyb6FaOX2WvXCdonY6cOD4sNQiCbWRq2_s8MA7wurA	2592000	d129cd7f-f60b-4e05-bdd8-ad1dda3f6011	2025-02-28 17:09:51.694501+00
\.


--
-- Data for Name: reset_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reset_session (id, user_id, created_at) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	Admin
2	User
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, first_name, hashed_password, is_verify, is_deleted, role_id) FROM stdin;
e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	admin@admin.com	admin	$2b$12$5WMsLBsj5DjEOj8FfWCpBOeiytGKtDez4KR8I/o8mOAgtb8tFxZZC	f	f	1
0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	user1@user.com	user1	$2b$12$cjMcYcoWPLhJjgviFyMqG.ayD0B17/67boxbC.udub.hAOa5T0jEi	f	f	2
d129cd7f-f60b-4e05-bdd8-ad1dda3f6011	user2@user.com	user2	$2b$12$rhbzaaPIrEiLRSlEe43ZyOUb3ACTuFGXPeKYUsXVOOAS2eLSmL8K.	f	f	2
\.


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: confirm_session confirm_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.confirm_session
    ADD CONSTRAINT confirm_session_pkey PRIMARY KEY (id);


--
-- Name: refresh_session refresh_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_session
    ADD CONSTRAINT refresh_session_pkey PRIMARY KEY (refresh_token);


--
-- Name: reset_session reset_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_session
    ADD CONSTRAINT reset_session_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: ix_confirm_session_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_confirm_session_id ON public.confirm_session USING btree (id);


--
-- Name: ix_refresh_session_refresh_token; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_refresh_session_refresh_token ON public.refresh_session USING btree (refresh_token);


--
-- Name: ix_reset_session_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX ix_reset_session_id ON public.reset_session USING btree (id);


--
-- Name: confirm_session confirm_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.confirm_session
    ADD CONSTRAINT confirm_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: refresh_session refresh_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.refresh_session
    ADD CONSTRAINT refresh_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: reset_session reset_session_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reset_session
    ADD CONSTRAINT reset_session_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "notification_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 15.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: notification_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE notification_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE notification_db OWNER TO postgres;

\connect notification_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 15.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

--
-- Database "routes_db" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.12
-- Dumped by pg_dump version 15.12

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: routes_db; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE routes_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE routes_db OWNER TO postgres;

\connect routes_db

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: routestatus; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.routestatus AS ENUM (
    'APPROVED',
    'REJECTED',
    'MODERATION'
);


ALTER TYPE public.routestatus OWNER TO postgres;

--
-- Name: routetype; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.routetype AS ENUM (
    'PEDESTRIAN',
    'CAR',
    'ORIENTEERING',
    'ALPINISM',
    'CYCLING',
    'CAMPING',
    'SKIING',
    'KAYAKING',
    'SUP_SURFING',
    'DIVING',
    'RAFTING',
    'HORSEBACK_RIDING',
    'SNOWMOBILE',
    'BUGGY',
    'ENDURO',
    'OFF_ROAD',
    'TRAIN'
);


ALTER TYPE public.routetype OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO postgres;

--
-- Name: answers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.answers (
    id uuid NOT NULL,
    comment_id uuid NOT NULL,
    author_id uuid NOT NULL,
    text character varying NOT NULL
);


ALTER TABLE public.answers OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id uuid NOT NULL,
    author_id uuid NOT NULL,
    text character varying NOT NULL,
    rating integer NOT NULL,
    route_id uuid NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: points; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.points (
    id uuid NOT NULL,
    name character varying NOT NULL,
    description character varying,
    coord_x double precision NOT NULL,
    coord_y double precision NOT NULL,
    route_id uuid NOT NULL,
    photo character varying NOT NULL
);


ALTER TABLE public.points OWNER TO postgres;

--
-- Name: route_photos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.route_photos (
    id uuid NOT NULL,
    route_id uuid NOT NULL,
    photo_path character varying NOT NULL
);


ALTER TABLE public.route_photos OWNER TO postgres;

--
-- Name: routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routes (
    id uuid NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    type public.routetype NOT NULL,
    is_public boolean NOT NULL,
    status public.routestatus NOT NULL,
    owner_id uuid NOT NULL,
    distance double precision NOT NULL
);


ALTER TABLE public.routes OWNER TO postgres;

--
-- Name: saved_routes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_routes (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    route_id uuid NOT NULL
);


ALTER TABLE public.saved_routes OWNER TO postgres;

--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.alembic_version (version_num) FROM stdin;
53cd9ca9d5d9
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.answers (id, comment_id, author_id, text) FROM stdin;
\.


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, author_id, text, rating, route_id) FROM stdin;
8162c08a-38dc-4830-8323-82db9ed2ddd5	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	╨н╤В╨╛ ╨║╨╛╨╝╨╡╨╜╤В╨░╤А╨╕╨╣ 1	4	3763880d-5a69-4254-9f0c-f2e1c43dd205
060b2420-fe57-4234-a9de-2f02059148b2	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	╨Р ╤Н╤В╨╛ ╨╛╤В╨╖╤Л╨▓ 1 ╨╕ ╨╛╨╜ ╨┐╨╗╨╛╤Е╨╛╨╣	2	c69604d4-71f0-4157-b835-ec5a0dfd3395
b99c5480-01e7-450e-b141-b9f6a6129ba0	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	╨░ ╤Н╤В╨╛ ╨╛╤В╨╖╤Л╨▓ 2 ╨╕ ╨╛╨╜ ╤Е╨╛╤А╨╛╤И╨╕╨╣	5	c69604d4-71f0-4157-b835-ec5a0dfd3395
f4e0c33e-e5c4-4e92-b20b-98bb53194435	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	╨░ ╨▓╨╛╤В ╤Н╤В╨╛ ╨╛╤З╨╡╨╜╤М ╨│╨╜╨╡╨▓╨╜╤Л╨╣ ╨║╨╛╨╝╨╝╨╡╨╜╤В╨░╤А╨╕╨╣ 2	1	3763880d-5a69-4254-9f0c-f2e1c43dd205
\.


--
-- Data for Name: points; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.points (id, name, description, coord_x, coord_y, route_id, photo) FROM stdin;
0c6c1a14-25fb-435b-aeef-90ab9f0db3b8	╤Н╤В╨╛ ╤В╨╛╤З╨║╨░ 1	╤Н╤В╨╛ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 1	55.758387839037375	37.62030170182676	c69604d4-71f0-4157-b835-ec5a0dfd3395	/media/008b33f8-f4d3-4e0c-98fb-42af2526e221.png
071082dd-0716-4671-8412-62490c3deca3	╤Н╤В╨╛ ╤В╨╛╤З╨║╨░ 2	╤Н╤В╨╛ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 2	55.746867263463656	37.61240527848692	c69604d4-71f0-4157-b835-ec5a0dfd3395	/media/34171dc5-e965-45d8-a555-4e4422a4af06.png
99dfaa52-1434-40d1-a11b-4bdb17cfd0f5	╤Н╤В╨╛ ╤В╨╛╤З╨║╨░ 3	╤Н╤В╨╛ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 3	55.75216159211755	37.5837132614657	c69604d4-71f0-4157-b835-ec5a0dfd3395	/media/dbc0f8a8-f56c-4727-b98a-d66c73cf5176.png
9851bdad-8b95-47e9-8153-51ad531d8174	╤Н╤В╨╛ ╤В╨╛╤З╨║╨░ 1	╤Н╤В╨╛ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 1	55.758387839037375	37.62030170182676	e3e89690-00c5-48a3-8b9b-b26af33f027a	/media/850efccc-8bfb-4ff3-8946-7521879b7c30.png
53ef2974-6a0e-43e4-a4e1-eee596d8ef67	╤Н╤В╨╛ ╤В╨╛╤З╨║╨░ 2	╤Н╤В╨╛ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 2	55.746867263463656	37.61240527848692	e3e89690-00c5-48a3-8b9b-b26af33f027a	/media/af526048-f081-4246-b966-96918d5b22fb.png
35862239-3969-49f8-9f20-a71dfc877a93	╤Н╤В╨╛ ╤В╨╛╤З╨║╨░ 3	╤Н╤В╨╛ ╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 3	55.75216159211755	37.5837132614657	e3e89690-00c5-48a3-8b9b-b26af33f027a	/media/a13b3606-c2cf-41cf-9487-ae15444bdef6.png
5e4b7e4e-e0e8-4e5a-ad29-31ce1b0f70fc	╤В╨╛╤З╨║╨░ 1	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 1	55.765884139309556	37.64270448329605	92d4676e-982c-40bd-a921-c13c3b79b11f	/media/1d8bbb65-5e7f-41e2-881d-212be25903d0.png
29f070db-1814-436c-ba47-72a60be7ea7e	╤В╨╛╤З╨║╨░ 2	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 2	55.792330604095376	37.687429020827835	92d4676e-982c-40bd-a921-c13c3b79b11f	/media/c730839c-41d5-441f-904b-fc9f576d9963.png
f7ee8ccc-66c7-4f2e-9a11-9b7695f8f30e	╤В╨╛╤З╨║╨░ 3	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 3	55.81547606690126	37.96366960211578	92d4676e-982c-40bd-a921-c13c3b79b11f	/media/0f4d09b1-452c-40b0-8785-7c0ecd7815e2.png
54e98bf0-2634-4f75-a918-e751fc4c943e	╤В╨╛╤З╨║╨░ 1	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 1	55.765884139309556	37.64270448329605	652c8ebe-0d70-480a-827d-f389df64d513	/media/dc40099c-b31e-45d6-b0d5-838eac1c3a33.png
8106612e-0ec6-46ec-ba08-1710844e8ba8	╤В╨╛╤З╨║╨░ 2	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 2	55.792330604095376	37.687429020827835	652c8ebe-0d70-480a-827d-f389df64d513	/media/8c6669d5-bb25-4185-b4d1-64f5b0590f40.png
3a83165b-2ccf-4ea8-906e-3646258c309a	╤В╨╛╤З╨║╨░ 3	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 3	55.81547606690126	37.96366960211578	652c8ebe-0d70-480a-827d-f389df64d513	/media/96954705-83dc-4066-a881-bc82881046f9.png
f8f4bb6b-8394-4686-932a-c02295dc3818	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 1	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 1	59.93832442220822	30.313402706984345	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/475377fb-92a7-422b-a8db-495660e9893f.png
f1d05410-5a38-436b-8ea3-4dbfef7b0680	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 2	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 2	59.972014844520075	30.315119320753887	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/12806790-8896-4c4d-a628-10e646e263fa.png
002630be-d084-46b0-a24d-f8524cf3ebec	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 3	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 3	59.99291566491887	30.379212172510698	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/902f8de4-e1f7-42ca-bedf-86bb57df117f.png
62a4a92d-0b4c-4644-b629-acce1b3d5cc6	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 4	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 4	60.03197101329511	30.432649869423	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/8be830df-072a-4af7-95b4-efe3cc9c3ac2.png
bd540a4f-9d36-4b9d-aa28-7227c52703bb	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 1	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 1	59.93832442220822	30.313402706984345	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/b4857b41-c43a-458e-ac84-06cb77049b0b.png
9878b0d1-a4f9-4d2d-8910-52e5bb063bbe	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 2	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 2	59.972014844520075	30.315119320753887	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/2ab3c857-e4c3-4c8b-b929-5fbd53367851.png
6c8bd6ac-031e-42c7-b728-4b587c23d17a	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 3	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 3	59.99291566491887	30.379212172510698	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/d5fff668-bafe-43d5-b16a-ec769cc2e8a2.png
551f321e-4acf-4813-a242-bc05aa0e72a3	╨╜╨░╨╖╨▓╨░╨╜╨╕╨╡ 4	╨╛╨┐╨╕╤Б╨░╨╜╨╕╨╡ 4	60.03197101329511	30.432649869423	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/02b9682a-d745-448f-915c-fa97894122c2.png
\.


--
-- Data for Name: route_photos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.route_photos (id, route_id, photo_path) FROM stdin;
698d4808-4a62-4e9b-aba0-259cf35a00b6	c69604d4-71f0-4157-b835-ec5a0dfd3395	/media/4031cd91-bc26-46e1-b07e-b7dcae1a4c00.png
830de07f-16cb-4853-90b5-96970f123f11	e3e89690-00c5-48a3-8b9b-b26af33f027a	/media/b5b3076b-dda1-4741-830a-1927484fb3f4.png
47960664-6ccf-4486-86ea-63d96073020d	c69604d4-71f0-4157-b835-ec5a0dfd3395	/media/da9f7791-3831-4e0c-94d1-aa81997ee616.png
29827961-b158-498f-8e43-475e5329dc8a	c69604d4-71f0-4157-b835-ec5a0dfd3395	/media/917cef92-c777-408f-b744-13d8f3246b08.png
8aad5fcd-4a7a-4f07-b664-767fc0e7efa9	e3e89690-00c5-48a3-8b9b-b26af33f027a	/media/caaf86b5-fee7-459a-ab03-d7c1b6ad4d38.png
9ceb6997-dfd4-4d69-8196-d139de99bbd9	e3e89690-00c5-48a3-8b9b-b26af33f027a	/media/95400d0e-3c8e-4f19-8df2-7a0c662d0ca7.png
417ba468-0dda-4577-950c-24f2eec431dc	92d4676e-982c-40bd-a921-c13c3b79b11f	/media/70aa3ba5-6624-4e77-bb0e-630d9a0d309c.png
0a25d149-35b7-4708-bbe5-7175fee70215	652c8ebe-0d70-480a-827d-f389df64d513	/media/637fa4ba-21f3-41c1-aa5e-30f90fe149d7.png
508e6672-8b61-40f3-9fe3-74b9ee1c62ce	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/8ea79dc5-9dd1-45c0-980f-6a2ad8046ea2.png
3aa3ed21-3076-433a-a7c9-557a7e93271c	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/9e5b5f55-b87f-41c8-a057-34735cc7155f.png
c7e2adb0-e226-4a77-b53c-57b2989fc7b1	a4cb8963-b62d-44c6-bb99-bb27b31a7745	/media/6c1853d8-1d21-4cf8-97ee-073e21aa485e.png
94cedf38-d450-4638-8ce4-7d32953cdb89	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/0f262eb8-1dd8-4f01-91e0-8d2830ee63c1.png
e36c99ba-003c-4438-a950-cd05987a0cd3	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/22d5959e-7dcc-4314-bca7-7473ac95f443.png
855fb048-4f6a-4f41-88cf-923ddaa9ce3f	3763880d-5a69-4254-9f0c-f2e1c43dd205	/media/9a7be839-b397-4cde-92e4-06edee90084f.png
\.


--
-- Data for Name: routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routes (id, title, description, type, is_public, status, owner_id, distance) FROM stdin;
e3e89690-00c5-48a3-8b9b-b26af33f027a	╨Я╤А╨╛╨╡╨╖╨┤ ╨┐╨╛ ╨Ь╨╛╤Б╨║╨▓╨╡	asdasdasdasdad	ORIENTEERING	t	MODERATION	d129cd7f-f60b-4e05-bdd8-ad1dda3f6011	8.43
c69604d4-71f0-4157-b835-ec5a0dfd3395	╨Я╤А╨╛╨╡╨╖╨┤ ╨┐╨╛ ╨Ь╨╛╤Б╨║╨▓╨╡	asdasdasdasdad	ORIENTEERING	t	APPROVED	d129cd7f-f60b-4e05-bdd8-ad1dda3f6011	8.43
92d4676e-982c-40bd-a921-c13c3b79b11f	╨╝╨░╤А╤И╤А╤Г╤В 42	╤Д╤Л╨╛╤Д╤Л╨▓╨╗╨┤╨┐╤А╤Д╨░╨╛╨╗╨┐╤А╨╛╨╗╤Д╤Л╨▓╤А╨┐╨╛╨╗╤Л╨▓╨░╤А╨┐╨╛╤А╤Л╨▓╨░╨┐╤А╤Л╨▓╨░╨╛╨╗	PEDESTRIAN	f	APPROVED	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	29.43
652c8ebe-0d70-480a-827d-f389df64d513	╨╝╨░╤А╤И╤А╤Г╤В 42	╤Д╤Л╨╛╤Д╤Л╨▓╨╗╨┤╨┐╤А╤Д╨░╨╛╨╗╨┐╤А╨╛╨╗╤Д╤Л╨▓╤А╨┐╨╛╨╗╤Л╨▓╨░╤А╨┐╨╛╤А╤Л╨▓╨░╨┐╤А╤Л╨▓╨░╨╛╨╗	PEDESTRIAN	f	APPROVED	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	29.43
a4cb8963-b62d-44c6-bb99-bb27b31a7745	╨Я╤А╨╛╨╡╨╖╨┤ ╨┐╨╛ ╨┐╨╕╤В╨╡╤А╤Г	╨Я╨Ш╨в╨Х╨а ╨Я╨Ш╨в╨Х╨а ╨Я╨Ш╨в╨Х╨а	CAR	t	MODERATION	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	18.34
3763880d-5a69-4254-9f0c-f2e1c43dd205	╨Я╤А╨╛╨╡╨╖╨┤ ╨┐╨╛ ╨┐╨╕╤В╨╡╤А╤Г	╨Я╨Ш╨в╨Х╨а ╨Я╨Ш╨в╨Х╨а ╨Я╨Ш╨в╨Х╨а	CAR	t	APPROVED	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	18.34
\.


--
-- Data for Name: saved_routes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_routes (id, user_id, route_id) FROM stdin;
453a28d4-dea3-44f9-97f1-9e9e1b52f331	e895a7f6-5b4d-4792-a7e9-121d6e9c8eb6	3763880d-5a69-4254-9f0c-f2e1c43dd205
e0e7ce46-5902-40bd-9449-fa207d14a34c	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	3763880d-5a69-4254-9f0c-f2e1c43dd205
0d13914d-eafa-4d19-9e32-061c1df14b46	0e80e36e-fd4a-4ca5-bdb3-26cc66fad344	c69604d4-71f0-4157-b835-ec5a0dfd3395
9899a5db-c1b5-422d-9009-cb660e56c2a8	d129cd7f-f60b-4e05-bdd8-ad1dda3f6011	c69604d4-71f0-4157-b835-ec5a0dfd3395
\.


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: points points_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_pkey PRIMARY KEY (id);


--
-- Name: route_photos route_photos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_photos
    ADD CONSTRAINT route_photos_pkey PRIMARY KEY (id);


--
-- Name: routes routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routes
    ADD CONSTRAINT routes_pkey PRIMARY KEY (id);


--
-- Name: saved_routes saved_routes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_routes
    ADD CONSTRAINT saved_routes_pkey PRIMARY KEY (id);


--
-- Name: answers answers_comment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_comment_id_fkey FOREIGN KEY (comment_id) REFERENCES public.comments(id) ON DELETE CASCADE;


--
-- Name: comments comments_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- Name: points points_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.points
    ADD CONSTRAINT points_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- Name: route_photos route_photos_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.route_photos
    ADD CONSTRAINT route_photos_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- Name: saved_routes saved_routes_route_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_routes
    ADD CONSTRAINT saved_routes_route_id_fkey FOREIGN KEY (route_id) REFERENCES public.routes(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--


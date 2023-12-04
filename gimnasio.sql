--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-11-28 15:43:11

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
-- TOC entry 215 (class 1259 OID 41315)
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    att_id integer NOT NULL,
    pla_id integer NOT NULL,
    mem_id integer NOT NULL,
    att_entry date NOT NULL,
    att_exit date NOT NULL
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 41314)
-- Name: attendance_att_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendance_att_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attendance_att_id_seq OWNER TO postgres;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 214
-- Name: attendance_att_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendance_att_id_seq OWNED BY public.attendance.att_id;


--
-- TOC entry 217 (class 1259 OID 41325)
-- Name: details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.details (
    det_id integer NOT NULL,
    inv_id integer NOT NULL,
    det_description character varying(30) NOT NULL,
    det_price money NOT NULL,
    det_amount integer NOT NULL
);


ALTER TABLE public.details OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 41324)
-- Name: details_det_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.details_det_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.details_det_id_seq OWNER TO postgres;

--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 216
-- Name: details_det_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.details_det_id_seq OWNED BY public.details.det_id;


--
-- TOC entry 219 (class 1259 OID 41334)
-- Name: donations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.donations (
    don_id integer NOT NULL,
    mem_id integer,
    don_date date,
    don_amount money,
    don_name character varying(30),
    don_price money
);


ALTER TABLE public.donations OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41333)
-- Name: donations_don_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.donations_don_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.donations_don_id_seq OWNER TO postgres;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 218
-- Name: donations_don_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.donations_don_id_seq OWNED BY public.donations.don_id;


--
-- TOC entry 221 (class 1259 OID 41343)
-- Name: exercise; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.exercise (
    exe_id integer NOT NULL,
    rou_id integer NOT NULL,
    exe_name character varying(30),
    exe_set integer,
    exe_reps integer
);


ALTER TABLE public.exercise OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41342)
-- Name: exercise_exe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.exercise_exe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.exercise_exe_id_seq OWNER TO postgres;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 220
-- Name: exercise_exe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.exercise_exe_id_seq OWNED BY public.exercise.exe_id;


--
-- TOC entry 223 (class 1259 OID 41352)
-- Name: invoice; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.invoice (
    inv_id integer NOT NULL,
    mem_id integer NOT NULL,
    inv_date date NOT NULL,
    inv_number integer NOT NULL,
    inv_total money NOT NULL
);


ALTER TABLE public.invoice OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 41351)
-- Name: invoice_inv_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.invoice_inv_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.invoice_inv_id_seq OWNER TO postgres;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 222
-- Name: invoice_inv_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.invoice_inv_id_seq OWNED BY public.invoice.inv_id;


--
-- TOC entry 224 (class 1259 OID 41360)
-- Name: manage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manage (
    pla_id integer NOT NULL,
    own_id integer NOT NULL
);


ALTER TABLE public.manage OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 41369)
-- Name: member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.member (
    mem_id integer NOT NULL,
    pla_id integer NOT NULL,
    mem_name character varying(30) NOT NULL,
    mem_lastname character varying(30) NOT NULL,
    mem_code character varying(30) NOT NULL,
    mem_phone character varying(10) NOT NULL,
    mem_email character varying(50) NOT NULL,
    mem_location character varying(50) NOT NULL,
    mem_password character varying(100) NOT NULL
);


ALTER TABLE public.member OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 41368)
-- Name: member_mem_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.member_mem_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.member_mem_id_seq OWNER TO postgres;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 225
-- Name: member_mem_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.member_mem_id_seq OWNED BY public.member.mem_id;


--
-- TOC entry 228 (class 1259 OID 41378)
-- Name: membership; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.membership (
    mbs_id integer NOT NULL,
    rou_id integer,
    mem_id integer NOT NULL,
    mbs_star_date date NOT NULL,
    mbs_due_date date NOT NULL,
    mbs_state boolean
);


ALTER TABLE public.membership OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 41377)
-- Name: membership_mbs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.membership_mbs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.membership_mbs_id_seq OWNER TO postgres;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 227
-- Name: membership_mbs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.membership_mbs_id_seq OWNED BY public.membership.mbs_id;


--
-- TOC entry 230 (class 1259 OID 41388)
-- Name: owner; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.owner (
    own_id integer NOT NULL,
    own_name character varying(30) NOT NULL,
    own_lastname character varying(30) NOT NULL,
    own_email character varying(50) NOT NULL,
    own_password character varying(100) NOT NULL,
    own_role character varying(20) NOT NULL
);


ALTER TABLE public.owner OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 41387)
-- Name: owner_own_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.owner_own_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.owner_own_id_seq OWNER TO postgres;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 229
-- Name: owner_own_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.owner_own_id_seq OWNED BY public.owner.own_id;


--
-- TOC entry 232 (class 1259 OID 41396)
-- Name: place; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.place (
    pla_id integer NOT NULL,
    pla_name character varying(30) NOT NULL,
    pla_location character varying(50) NOT NULL,
    pla_schedule character varying(30) NOT NULL,
    pla_classschedule character varying(30) NOT NULL,
    pla_type character varying(30) NOT NULL
);


ALTER TABLE public.place OWNER TO postgres;

--
-- TOC entry 231 (class 1259 OID 41395)
-- Name: place_pla_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.place_pla_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.place_pla_id_seq OWNER TO postgres;

--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 231
-- Name: place_pla_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.place_pla_id_seq OWNED BY public.place.pla_id;


--
-- TOC entry 234 (class 1259 OID 41404)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    pro_id integer NOT NULL,
    inv_id integer NOT NULL,
    pro_name character(30) NOT NULL,
    pro_description character(30) NOT NULL,
    pro_cost money NOT NULL,
    pro_stock integer NOT NULL,
    pro_category character varying(30) NOT NULL,
    pro_duration integer,
    pro_benefits character varying(50)
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 41403)
-- Name: product_pro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_pro_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_pro_id_seq OWNER TO postgres;

--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 233
-- Name: product_pro_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_pro_id_seq OWNED BY public.product.pro_id;


--
-- TOC entry 236 (class 1259 OID 41413)
-- Name: reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservation (
    res_id integer NOT NULL,
    mem_id integer NOT NULL,
    pla_id integer NOT NULL,
    res_date date NOT NULL,
    res_hour time without time zone NOT NULL,
    res_state boolean NOT NULL
);


ALTER TABLE public.reservation OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 41412)
-- Name: reservation_res_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservation_res_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_res_id_seq OWNER TO postgres;

--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 235
-- Name: reservation_res_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservation_res_id_seq OWNED BY public.reservation.res_id;


--
-- TOC entry 238 (class 1259 OID 41423)
-- Name: routine; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.routine (
    rou_id integer NOT NULL,
    mbs_id integer NOT NULL,
    rou_type character varying(30),
    rou_name character varying(30)
);


ALTER TABLE public.routine OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 41422)
-- Name: routine_rou_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.routine_rou_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.routine_rou_id_seq OWNER TO postgres;

--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 237
-- Name: routine_rou_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.routine_rou_id_seq OWNED BY public.routine.rou_id;


--
-- TOC entry 3232 (class 2604 OID 41318)
-- Name: attendance att_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance ALTER COLUMN att_id SET DEFAULT nextval('public.attendance_att_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 41328)
-- Name: details det_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details ALTER COLUMN det_id SET DEFAULT nextval('public.details_det_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 41337)
-- Name: donations don_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations ALTER COLUMN don_id SET DEFAULT nextval('public.donations_don_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 41346)
-- Name: exercise exe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise ALTER COLUMN exe_id SET DEFAULT nextval('public.exercise_exe_id_seq'::regclass);


--
-- TOC entry 3236 (class 2604 OID 41355)
-- Name: invoice inv_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice ALTER COLUMN inv_id SET DEFAULT nextval('public.invoice_inv_id_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 41372)
-- Name: member mem_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member ALTER COLUMN mem_id SET DEFAULT nextval('public.member_mem_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 41381)
-- Name: membership mbs_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership ALTER COLUMN mbs_id SET DEFAULT nextval('public.membership_mbs_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 41391)
-- Name: owner own_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner ALTER COLUMN own_id SET DEFAULT nextval('public.owner_own_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 41399)
-- Name: place pla_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place ALTER COLUMN pla_id SET DEFAULT nextval('public.place_pla_id_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 41407)
-- Name: product pro_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN pro_id SET DEFAULT nextval('public.product_pro_id_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 41416)
-- Name: reservation res_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation ALTER COLUMN res_id SET DEFAULT nextval('public.reservation_res_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 41426)
-- Name: routine rou_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routine ALTER COLUMN rou_id SET DEFAULT nextval('public.routine_rou_id_seq'::regclass);


--
-- TOC entry 3456 (class 0 OID 41315)
-- Dependencies: 215
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance (att_id, pla_id, mem_id, att_entry, att_exit) FROM stdin;
1	1	1	2023-11-01	2023-11-01
2	2	2	2023-11-02	2023-11-02
3	3	3	2023-11-03	2023-11-03
27	1	1	2023-11-01	2023-11-02
28	1	1	2022-01-12	2022-01-12
\.


--
-- TOC entry 3458 (class 0 OID 41325)
-- Dependencies: 217
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.details (det_id, inv_id, det_description, det_price, det_amount) FROM stdin;
1	1	Product A	$10,00	100
2	1	Product B	$20,00	50
3	2	Product C	$15,00	75
5	1	string	$0,00	0
\.


--
-- TOC entry 3460 (class 0 OID 41334)
-- Dependencies: 219
-- Data for Name: donations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.donations (don_id, mem_id, don_date, don_amount, don_name, don_price) FROM stdin;
1	1	2023-11-01	$100,00	Donation A	$10,00
2	2	2023-11-02	$50,00	Donation B	$5,00
3	3	2023-11-03	$75,00	Donation C	$7,50
\.


--
-- TOC entry 3462 (class 0 OID 41343)
-- Dependencies: 221
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise (exe_id, rou_id, exe_name, exe_set, exe_reps) FROM stdin;
1	1	Exercise A	3	10
2	2	Exercise B	4	12
3	3	Exercise C	3	8
\.


--
-- TOC entry 3464 (class 0 OID 41352)
-- Dependencies: 223
-- Data for Name: invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice (inv_id, mem_id, inv_date, inv_number, inv_total) FROM stdin;
1	1	2023-11-01	1001	$30,00
2	2	2023-11-02	1002	$45,00
3	3	2023-11-03	1003	$25,00
\.


--
-- TOC entry 3465 (class 0 OID 41360)
-- Dependencies: 224
-- Data for Name: manage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.manage (pla_id, own_id) FROM stdin;
1	1
2	2
3	3
\.


--
-- TOC entry 3467 (class 0 OID 41369)
-- Dependencies: 226
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member (mem_id, pla_id, mem_name, mem_lastname, mem_code, mem_phone, mem_email, mem_location, mem_password) FROM stdin;
1	1	Member A	Lastname A	MEM001	1234567890	membera@example.com	Location A	password1
2	2	Member B	Lastname B	MEM002	9876543210	memberb@example.com	Location B	password2
3	3	Member C	Lastname C	MEM003	5555555555	memberc@example.com	Location C	password3
16	1	string	string	string	string	string@hotmail.com	string	$2b$10$/OAM8tfPzaeMhCnurIO.8Ouq0oj2r9NbijUc8H5ReSM3n94B7WTnq
17	1	string	string	string	string	string@hotmail.com	string	$2b$10$zw0aKuj0cxOKGW0qhyOQ9OUgIAXEcvpjdpkyw7qzesahQP04MCpC.
18	1	string	string	string	string	string@hotmail.com	string	$2b$10$uZwf2V5E/PTx4V.xbwIqAupORUj/CGSDt9HNgxysknDJkBHQZC1Na
19	1	string	string	string	string	string@hotmail.com	string	$2b$10$.bS9RAVfIigfv2CHiSiBUuA4QUTXUbm0LCxkDWSBtoiyZhMDEBGXy
20	1	string	string	string	string	string@hotmail.com	string	$2b$10$Gb.RVWQaDx3yJFMGFSq1U.Xjkv0mmhEP1xr6zke6t1xrEu/vXviHi
21	1	string	string	string	string	string@hotmail.com	string	$2b$10$Fykv9.Rxl05J79Pq/Vb3p.mWLvQ0Y4dk1lRxixVUv/PNDeuWI5wIG
22	1	string	string	string	string	string@hotmail.com	string	$2b$10$.dRB/c7FR32YHL3.Eg1dvufGimLTcbMKupntuhAvbk0gttuZrOIHe
23	1	string	string	string	string	string@hotmail.com	string	$2b$10$YOv.t9sLJkTsrLQ/RIuB..JswESOyH7RgMwqnaa5ldmzzB.1hhxh.
24	1	string	string	string	string	string@hotmail.com	string	$2b$10$HcBtUjQEvvsj2P04SfHU6e2ZsIdowzTrfviF5XrZ..VsQ9mQDK0VW
25	1	string	string	string	string	string@hotmail.com	string	$2b$10$NNxsTJPCGV2txstd.P1wQeFnnPNW8KyFlg.duzw0YSAi5lrkD9ho.
26	1	string	string	string	string	string@hotmail.com	string	$2b$10$YZIzUZJpeXX/TDBCghdu5.NQ4aIi9cTdv66JqN3Xso1ZFlY2MHIki
27	1	string	string	string	string	string@hotmail.com	string	$2b$10$akg8WRLup3VG1E7/H/y/kOPSAEdjA137WFR9I6M3ZPju6SXasQedO
28	1	string	string	string	string	string@hotmail.com	string	$2b$10$.qgnZGYkQl6SW3aujSb1U.Q6AUjQFd7wmZ0yoQ5QWF3.nJ2CLlaCO
29	1	string	string	string	string	string@hotmail.com	string	$2b$10$Q83.weMqGJLF/WBu9thPsu5uDa.vugOiuQhzFHxGgRCyESVwd/hiy
30	1	string	string	string	string	string@hotmail.com	string	$2b$10$dQMsJ94JYBEpaCrmaz/9L.1I8jdRjg94iXGCuF.oeI5yxqnJa3jy6
31	1	string	string	string	string	string@hotmail.com	string	$2b$10$X5KuDW1S0i94IkZR7WqdJej4otCoWSIH6iykcBrihYvapVyutCN36
32	1	string	string	string	string	string@hotmail.com	string	$2b$10$22MZPv/WhRxmaS0oedYpRuPwuCeCAOvZF4rFupO63fNBVS4MA8lwG
33	1	string	string	string	string	string@hotmail.com	string	$2b$10$mi2abNHLsrmPj0y7xkQtg.Ip9BRMMakgbI7QM2qZAwJAoKeRMjTT2
34	1	string	string	string	string	string@hotmail.com	string	$2b$10$pgQV28BcFuIEu2zFGHYb5.zXH9QTA7R9MN5xBgQGe3qNxN2VNB47O
35	1	string	string	string	string	string@hotmail.com	string	$2b$10$szzgMc8V8yfUUSLFWXarjuF1Uo/S/o89FT4etOipgS7fbC2Y7G1N2
36	1	string	string	string	string	string@hotmail.com	string	$2b$10$LcLunHqxWUv6mFedbkLNuOdzRewXKgV8yleVNxyL8VyQA09A7LO72
37	1	string	string	string	string	string@hotmail.com	string	$2b$10$wkoLDih78X5ovM9AtXATzOsXVFIIi7ivRtGTtucmpkqDcEEn7vC9O
38	1	string	string	string	string	string11@hotmail.com	string	$2b$10$7tIqiLSnhPLZME9GE9u9ROE.HvodgHZLbe78hE2U4.nHX/Y0wpeIS
39	1	string	string	string	string	string12@hotmail.com	string	$2b$10$2MJ.tFBKbjuT8x84t6DUq.CzN1dnqyKB.Kh5YhTc/QgJFApRKartK
40	1	string	string	string	string	string13@hotmail.com	string	$2b$10$ZXl5SsnQTShZ3vABJfzmwesu9XyrNUte/wygORXHgPVsOByZXEu5.
41	1	string	string	string	string	string14@hotmail.com	string	$2b$10$7tLjHG9yl8C1i832fGUNluKVfuiZ85oraF9gHrSaWouoPEfowI2Ry
42	1	string	string	string	string	string15@hotmail.com	string	$2b$10$XAh5CrtIj2m9oALv7Cn5MODwWo5IduxKtigURFvBDcjew1waZaCKa
43	1	string	string	string	string	string16@hotmail.com	string	$2b$10$CzXKG3mSZiQ0TMmZsyU0ieXUdCyhbUgM4zSatZctGbvsFudImgJT6
44	1	string	string	string	string	string17@hotmail.com	string	$2b$10$2XiaWP2uuc3k2HVrx78fA.nQ/fB8l2MtPTadJP.pSU4HEvzeGjFLy
45	1	string	string	string	string	string18@hotmail.com	string	$2b$10$OMA64aIg2aA4kdcAGKnkuu.SbQEzLMk2bQrY/0sgcM5/27EndwwRi
46	1	string	string	string	string	string19@hotmail.com	string	$2b$10$M6hXQSJ44mc9vK7I56OF2evtgYfiJUHROA2Ik4Haaz7GEGdcJDI8y
47	1	string	string	string	string	string20@hotmail.com	string	$2b$10$H4ZSXyJ6.PBRLqsA7tZbEu3IcEAZuS32/SM2BteaarQTVgaKYnXve
48	1	string	string	string	string	string21@hotmail.com	string	$2b$10$21uf41vAhSH4lMG/70O19OmBjrfESdTj61GyTl9yIyo.ExrSyxD22
49	1	string	string	string	string	string22@hotmail.com	string	$2b$10$dZVMIz6JZqtOaSJgApVmAO1gDeXS2WRBY8HnnzvTKJKqFcdzDxKV.
50	1	string	string	string	string	string23@hotmail.com	string	$2b$10$ohVqxTivaFhgv3FhPvw6ye016IawGH1u4k0R6Ukc1W.naAk1RmUma
51	1	string	string	string	string	string24@hotmail.com	string	$2b$10$L.he9RiJAPYKKGe4COzQxuq7yHZj3LQIYsb14L8NfF31sWs5T52LC
52	1	string	string	string	string	string25@hotmail.com	string	$2b$10$Jmqt8zFEanbKYvr20thEQ.SFvIOv47gWHoybQENlWapi72DHCFgke
53	1	string	string	string	string	string26@hotmail.com	string	$2b$10$DyTYoZvtZ3iG9ie8r5.vRetLjys2DanhKLzZI3EAx3HGktHjWy82u
54	1	string	string	string	string	string27@hotmail.com	string	$2b$10$pMYRXkCcfG8NTAfX3.IiT.iFwRtQVM/eA1Cz98.t6Cu9YNGhHPAlO
55	1	string	string	string	string	string28@hotmail.com	string	$2b$10$wZ4MJj3n4OWIkGbeEs0f1OMjyw2agNW.sv/jAYmiZQo9d3VX9wS4q
56	1	string	string	string	string	string29@hotmail.com	string	$2b$10$K5419N9RKXss3CiJ9dO2h.rY7zzS0Pz9XyK.v1I7WVzZhUhnbkKHm
57	1	string	string	string	string	string30@hotmail.com	string	$2b$10$IztPM6U/Iweaiw4lE9ykYes7GUHLenhvYxAc9dn/CX/ABNYS4J6Zu
58	1	string	string	string	string	string31@hotmail.com	string	$2b$10$P0JSwVEc2NK/XGnGE6nVtuLurEPTZ5TPY3gYVkrML2u1M1s3TaB7a
59	1	string	string	string	string	string32@hotmail.com	string	$2b$10$PoKckg.iZUEoumXhsfR3recE3sye2CFQTfyEKwMDvAPACdaDDUSpW
60	1	string	string	string	string	string33@hotmail.com	string	$2b$10$gzxRbQHs49AbbvFoozQo8uVasfsGzfa7XW4AHwBplBGJRyIKRoh.S
61	1	string	string	string	string	string34@hotmail.com	string	$2b$10$/EGXDMAUphJKZ1K8CY4.B.H/PqlqHmvcg0xvot9JuMV4nLNrORPPK
62	1	string	string	string	string	string35@hotmail.com	string	$2b$10$JU.YoKCUUH8Ac.rtXLkrZ.H.Uq0J.VuZRgYkSuUbcw0K63H9kW5RG
63	1	string	string	string	string	string36@hotmail.com	string	$2b$10$H6MiZdWE1dveWT62hUq/F.ViKLeK7E2euSYac.yDPB8EiuppcoOuq
64	1	string	string	string	string	string37@hotmail.com	string	$2b$10$KUeuSiBrk6rYIJlAiChmb.Re8hrlSOEyRjUyB4azkO1M6IL9FVw5u
65	1	string	string	string	string	string38@hotmail.com	string	$2b$10$VVK9NRPjbzSFMyBzxB3/G.fKIOav673PhdQpLReXZkJ1wLu2Z.8Iy
66	1	string	string	string	string	string39@hotmail.com	string	$2b$10$sXFNOfLV6FCysOORpQGeHeDvDj9vHvdd37W8GbZj/m3sS5ZLL6p5G
67	1	string	string	string	string	string40@hotmail.com	string	$2b$10$of9an6/B5.xoFQb/FULO4uCx2LZy3r8j7mYeE/EF9W4t1DYVwuTKy
68	1	string	string	string	string	string41@hotmail.com	string	$2b$10$73NYiIzQxFkoxHHjB2wp6Ojf1Sqm3QKtwQEfMHE4JiJuiWdcPXUpe
69	1	string	string	string	string	string42@hotmail.com	string	$2b$10$ph3AJOP9tJ551tZRsu7hpOa36SIcDQPm7jRONMHJk0UntxF7L40n6
70	1	string	string	string	string	string43@hotmail.com	string	$2b$10$78hLiQi/HXRQIC1/oGrGaedWLqcE7bE5ByMp8Sv33tx/6NTPeCFnG
71	1	string	string	string	string	string43@hotmail.com	string	$2b$10$5CWewIefq4KcNzeCeytoROd2AUEUgmyFEzu05mDqSwBX.O01S1QpG
72	1	string	string	string	string	string43@hotmail.com	string	$2b$10$3PL..ieo62FEJiKFcizKteQz1EoVdxVzJOxXGOzqIBJCBnWBWOP2G
73	1	string	string	string	string	string43@hotmail.com	string	$2b$10$gsUudxNo7U0C5be.CutVEOBjlF0XsNQiQc8DUQuLOYOXW7Aikd40W
74	1	string	string	string	string	string44@hotmail.com	string	$2b$10$f2kzpF7F/YesuUG8rFoYieJqRJVGsq1C4LpwSd4zmz7Wk8WhkW31G
75	1	string	string	string	string	string45@hotmail.com	string	$2b$10$.0yKnMbxvqDXMhg1nU3BD.rgOSwQckVrP1dO1JDtfEuK0BNi8Af5S
76	1	string	string	string	string	string545415@hotmail.com	string	string
77	1	string	string	string	string	hola52hjj42@hotmail.com	string	$2b$10$nFMwwwcps5oS5XATCDC0EO4opH4LmtzyLDjDy6yRZso7/onWdltWe
78	1	sdasd	sdzd	zsdzs	zsdz	zsdz@hotmail.com	zsdz	$2b$10$jplk76yiNfdfJfBE1pgZ3OffarxuPHBiyzj5mkkEzzk2vAJZ818RW
79	1	string	string	string	string	hola52hjj42@hotmail.com	string	$2b$10$04RHOUdB3CAuVow3aLh7duFNwLzepki3cQ/vGn/Zcy6J7YZokgIqO
80	1	zczs	zxc	zxcz	xzcz	zxcz@hotmail.com	zxc	$2b$10$IBZ4TZ85ZOU2CjKw2XGk1uFWazqvanx1dFByMWFj.bvhOxdjdXE5u
81	1	zxczxc	xczxc	zxczxc	xzczxc	zxczxczx@hotmail.com	zxczxc	$2b$10$xKKhS.v/PjoWhaz3sayP1uYupRI7KYhlgBq2pqKqFmTOWTD74ieSu
82	1	Chris	Loachamin	L00391417	0967149917	chris@hotmail.com	sangolqui	$2b$10$WQfNJMWYwFsisg33dF0.BetukZfdgDOXBRqRRtm7vFa6gVxKSwE2W
\.


--
-- TOC entry 3469 (class 0 OID 41378)
-- Dependencies: 228
-- Data for Name: membership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership (mbs_id, rou_id, mem_id, mbs_star_date, mbs_due_date, mbs_state) FROM stdin;
1	1	1	2023-11-01	2023-12-01	t
2	1	2	2023-11-02	2023-12-02	t
3	1	3	2023-11-03	2023-12-03	t
\.


--
-- TOC entry 3471 (class 0 OID 41388)
-- Dependencies: 230
-- Data for Name: owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.owner (own_id, own_name, own_lastname, own_email, own_password, own_role) FROM stdin;
1	Owner A	Lastname A	ownera@example.com	password1	Role A
2	Owner B	Lastname B	ownerb@example.com	password2	Role B
3	Owner C	Lastname C	ownerc@example.com	password3	Role C
7	aERzh	qqqqqqqqq	qqqqqqqqqq@hotmail.com	qqqqqq	qqqqqqqqqq
\.


--
-- TOC entry 3473 (class 0 OID 41396)
-- Dependencies: 232
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (pla_id, pla_name, pla_location, pla_schedule, pla_classschedule, pla_type) FROM stdin;
2	Place B	Location B	Schedule B	ClassSchedule B	Type B
3	Place C	Location C	Schedule C	ClassSchedule C	Type C
1	a	a	a	a	a
\.


--
-- TOC entry 3475 (class 0 OID 41404)
-- Dependencies: 234
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (pro_id, inv_id, pro_name, pro_description, pro_cost, pro_stock, pro_category, pro_duration, pro_benefits) FROM stdin;
1	1	Product 1                     	Description 1                 	$10,00	100	Category A	30	Benefits A
2	1	Product 2                     	Description 2                 	$20,00	50	Category B	45	Benefits B
3	2	Product 3                     	Description 3                 	$15,00	75	Category A	60	Benefits C
6	1	string2                       	string2                       	$0,00	0	string2	0	string2
5	1	string7777777777777777        	string2                       	$0,00	0	string2	0	string2
\.


--
-- TOC entry 3477 (class 0 OID 41413)
-- Dependencies: 236
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation (res_id, mem_id, pla_id, res_date, res_hour, res_state) FROM stdin;
1	1	1	2023-11-01	10:00:00	t
2	2	2	2023-11-02	11:00:00	t
3	3	3	2023-11-03	12:00:00	t
\.


--
-- TOC entry 3479 (class 0 OID 41423)
-- Dependencies: 238
-- Data for Name: routine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routine (rou_id, mbs_id, rou_type, rou_name) FROM stdin;
1	1	Type A	Routine A
2	2	Type B	Routine B
3	3	Type C	Routine C
11	1	string	string
\.


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 214
-- Name: attendance_att_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendance_att_id_seq', 28, true);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 216
-- Name: details_det_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.details_det_id_seq', 5, true);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 218
-- Name: donations_don_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.donations_don_id_seq', 3, true);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 220
-- Name: exercise_exe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.exercise_exe_id_seq', 9, true);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 222
-- Name: invoice_inv_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.invoice_inv_id_seq', 3, true);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 225
-- Name: member_mem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.member_mem_id_seq', 82, true);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 227
-- Name: membership_mbs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.membership_mbs_id_seq', 9, true);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 229
-- Name: owner_own_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.owner_own_id_seq', 9, true);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 231
-- Name: place_pla_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.place_pla_id_seq', 44, true);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 233
-- Name: product_pro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_pro_id_seq', 7, true);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 235
-- Name: reservation_res_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_res_id_seq', 3, true);


--
-- TOC entry 3508 (class 0 OID 0)
-- Dependencies: 237
-- Name: routine_rou_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.routine_rou_id_seq', 11, true);


--
-- TOC entry 3247 (class 2606 OID 41320)
-- Name: attendance pk_attendance; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT pk_attendance PRIMARY KEY (att_id);


--
-- TOC entry 3252 (class 2606 OID 41330)
-- Name: details pk_details; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT pk_details PRIMARY KEY (det_id);


--
-- TOC entry 3256 (class 2606 OID 41339)
-- Name: donations pk_donations; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT pk_donations PRIMARY KEY (don_id);


--
-- TOC entry 3260 (class 2606 OID 41348)
-- Name: exercise pk_exercise; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT pk_exercise PRIMARY KEY (exe_id);


--
-- TOC entry 3263 (class 2606 OID 41357)
-- Name: invoice pk_invoice; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT pk_invoice PRIMARY KEY (inv_id);


--
-- TOC entry 3269 (class 2606 OID 41364)
-- Name: manage pk_manage; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT pk_manage PRIMARY KEY (pla_id, own_id);


--
-- TOC entry 3273 (class 2606 OID 41374)
-- Name: member pk_member; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT pk_member PRIMARY KEY (mem_id);


--
-- TOC entry 3278 (class 2606 OID 41383)
-- Name: membership pk_membership; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT pk_membership PRIMARY KEY (mbs_id);


--
-- TOC entry 3281 (class 2606 OID 41393)
-- Name: owner pk_owner; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner
    ADD CONSTRAINT pk_owner PRIMARY KEY (own_id);


--
-- TOC entry 3283 (class 2606 OID 41401)
-- Name: place pk_place; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT pk_place PRIMARY KEY (pla_id);


--
-- TOC entry 3287 (class 2606 OID 41409)
-- Name: product pk_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT pk_product PRIMARY KEY (pro_id);


--
-- TOC entry 3291 (class 2606 OID 41418)
-- Name: reservation pk_reservation; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT pk_reservation PRIMARY KEY (res_id);


--
-- TOC entry 3296 (class 2606 OID 41428)
-- Name: routine pk_routine; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT pk_routine PRIMARY KEY (rou_id);


--
-- TOC entry 3244 (class 1259 OID 41323)
-- Name: assist_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX assist_fk ON public.attendance USING btree (mem_id);


--
-- TOC entry 3245 (class 1259 OID 41321)
-- Name: attendance_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX attendance_pk ON public.attendance USING btree (att_id);


--
-- TOC entry 3270 (class 1259 OID 41376)
-- Name: belongs_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX belongs_fk ON public.member USING btree (pla_id);


--
-- TOC entry 3257 (class 1259 OID 41350)
-- Name: contains_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contains_fk ON public.exercise USING btree (rou_id);


--
-- TOC entry 3249 (class 1259 OID 41331)
-- Name: details_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX details_pk ON public.details USING btree (det_id);


--
-- TOC entry 3253 (class 1259 OID 41340)
-- Name: donations_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX donations_pk ON public.donations USING btree (don_id);


--
-- TOC entry 3285 (class 1259 OID 41411)
-- Name: encompass_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX encompass_fk ON public.product USING btree (inv_id);


--
-- TOC entry 3258 (class 1259 OID 41349)
-- Name: exercise_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX exercise_pk ON public.exercise USING btree (exe_id);


--
-- TOC entry 3254 (class 1259 OID 41341)
-- Name: give_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX give_fk ON public.donations USING btree (mem_id);


--
-- TOC entry 3274 (class 1259 OID 41386)
-- Name: have_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX have_fk ON public.membership USING btree (mem_id);


--
-- TOC entry 3250 (class 1259 OID 41332)
-- Name: include_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX include_fk ON public.details USING btree (inv_id);


--
-- TOC entry 3261 (class 1259 OID 41358)
-- Name: invoice_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX invoice_pk ON public.invoice USING btree (inv_id);


--
-- TOC entry 3289 (class 1259 OID 41421)
-- Name: keep_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX keep_fk ON public.reservation USING btree (pla_id);


--
-- TOC entry 3294 (class 1259 OID 41430)
-- Name: make2_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX make2_fk ON public.routine USING btree (mbs_id);


--
-- TOC entry 3275 (class 1259 OID 41385)
-- Name: make_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX make_fk ON public.membership USING btree (rou_id);


--
-- TOC entry 3265 (class 1259 OID 41366)
-- Name: manage2_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX manage2_fk ON public.manage USING btree (own_id);


--
-- TOC entry 3266 (class 1259 OID 41367)
-- Name: manage_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX manage_fk ON public.manage USING btree (pla_id);


--
-- TOC entry 3267 (class 1259 OID 41365)
-- Name: manage_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX manage_pk ON public.manage USING btree (pla_id, own_id);


--
-- TOC entry 3271 (class 1259 OID 41375)
-- Name: member_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX member_pk ON public.member USING btree (mem_id);


--
-- TOC entry 3276 (class 1259 OID 41384)
-- Name: membership_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX membership_pk ON public.membership USING btree (mbs_id);


--
-- TOC entry 3279 (class 1259 OID 41394)
-- Name: owner_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX owner_pk ON public.owner USING btree (own_id);


--
-- TOC entry 3284 (class 1259 OID 41402)
-- Name: place_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX place_pk ON public.place USING btree (pla_id);


--
-- TOC entry 3264 (class 1259 OID 41359)
-- Name: possess_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX possess_fk ON public.invoice USING btree (mem_id);


--
-- TOC entry 3288 (class 1259 OID 41410)
-- Name: product_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_pk ON public.product USING btree (pro_id);


--
-- TOC entry 3248 (class 1259 OID 41322)
-- Name: register_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX register_fk ON public.attendance USING btree (pla_id);


--
-- TOC entry 3292 (class 1259 OID 41419)
-- Name: reservation_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX reservation_pk ON public.reservation USING btree (res_id);


--
-- TOC entry 3293 (class 1259 OID 41420)
-- Name: reserve_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reserve_fk ON public.reservation USING btree (mem_id);


--
-- TOC entry 3297 (class 1259 OID 41429)
-- Name: routine_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX routine_pk ON public.routine USING btree (rou_id);


--
-- TOC entry 3298 (class 2606 OID 41431)
-- Name: attendance fk_attendan_assist_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT fk_attendan_assist_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3299 (class 2606 OID 41436)
-- Name: attendance fk_attendan_register_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT fk_attendan_register_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3300 (class 2606 OID 41441)
-- Name: details fk_details_include_invoice; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT fk_details_include_invoice FOREIGN KEY (inv_id) REFERENCES public.invoice(inv_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3301 (class 2606 OID 41446)
-- Name: donations fk_donation_give_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT fk_donation_give_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3302 (class 2606 OID 41451)
-- Name: exercise fk_exercise_contains_routine; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT fk_exercise_contains_routine FOREIGN KEY (rou_id) REFERENCES public.routine(rou_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3303 (class 2606 OID 41456)
-- Name: invoice fk_invoice_possess_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT fk_invoice_possess_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3304 (class 2606 OID 41466)
-- Name: manage fk_manage_manage2_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT fk_manage_manage2_owner FOREIGN KEY (own_id) REFERENCES public.owner(own_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3305 (class 2606 OID 41461)
-- Name: manage fk_manage_manage_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT fk_manage_manage_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3306 (class 2606 OID 41471)
-- Name: member fk_member_belongs_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT fk_member_belongs_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3307 (class 2606 OID 41476)
-- Name: membership fk_membersh_have_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_membersh_have_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3308 (class 2606 OID 41481)
-- Name: membership fk_membersh_make_routine; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_membersh_make_routine FOREIGN KEY (rou_id) REFERENCES public.routine(rou_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3309 (class 2606 OID 41486)
-- Name: product fk_product_encompass_invoice; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_encompass_invoice FOREIGN KEY (inv_id) REFERENCES public.invoice(inv_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3310 (class 2606 OID 41491)
-- Name: reservation fk_reservat_keep_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservat_keep_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3311 (class 2606 OID 41496)
-- Name: reservation fk_reservat_reserve_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservat_reserve_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3312 (class 2606 OID 41501)
-- Name: routine fk_routine_make2_membersh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT fk_routine_make2_membersh FOREIGN KEY (mbs_id) REFERENCES public.membership(mbs_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2023-11-28 15:43:12

--
-- PostgreSQL database dump complete
--


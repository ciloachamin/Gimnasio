--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.4

-- Started on 2023-11-04 14:54:34

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
-- TOC entry 214 (class 1259 OID 41144)
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
-- TOC entry 215 (class 1259 OID 41152)
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
-- TOC entry 216 (class 1259 OID 41159)
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
-- TOC entry 217 (class 1259 OID 41166)
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
-- TOC entry 218 (class 1259 OID 41173)
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
-- TOC entry 219 (class 1259 OID 41180)
-- Name: manage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.manage (
    pla_id integer NOT NULL,
    own_id integer NOT NULL
);


ALTER TABLE public.manage OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 41188)
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
-- TOC entry 221 (class 1259 OID 41195)
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
-- TOC entry 222 (class 1259 OID 41203)
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
-- TOC entry 223 (class 1259 OID 41209)
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
-- TOC entry 224 (class 1259 OID 41215)
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
-- TOC entry 225 (class 1259 OID 41222)
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
-- TOC entry 226 (class 1259 OID 41230)
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
-- TOC entry 3431 (class 0 OID 41144)
-- Dependencies: 214
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance (att_id, pla_id, mem_id, att_entry, att_exit) FROM stdin;
1	1	1	2023-11-01	2023-11-01
2	2	2	2023-11-02	2023-11-02
\.


--
-- TOC entry 3432 (class 0 OID 41152)
-- Dependencies: 215
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.details (det_id, inv_id, det_description, det_price, det_amount) FROM stdin;
1	1	Descripción A	$20,00	2
2	2	Descripción B	$30,00	3
\.


--
-- TOC entry 3433 (class 0 OID 41159)
-- Dependencies: 216
-- Data for Name: donations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.donations (don_id, mem_id, don_date, don_amount, don_name, don_price) FROM stdin;
1	1	2023-11-01	$100,00	Donación Juan	$100,00
2	2	2023-11-02	$50,00	Donación Ana	$50,00
\.


--
-- TOC entry 3434 (class 0 OID 41166)
-- Dependencies: 217
-- Data for Name: exercise; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.exercise (exe_id, rou_id, exe_name, exe_set, exe_reps) FROM stdin;
1	1	Ejercicio 1	3	12
2	2	Ejercicio 2	4	10
\.


--
-- TOC entry 3435 (class 0 OID 41173)
-- Dependencies: 218
-- Data for Name: invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.invoice (inv_id, mem_id, inv_date, inv_number, inv_total) FROM stdin;
1	1	2023-11-01	1001	$50,00
2	2	2023-11-02	1002	$75,00
\.


--
-- TOC entry 3436 (class 0 OID 41180)
-- Dependencies: 219
-- Data for Name: manage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.manage (pla_id, own_id) FROM stdin;
1	1
2	2
\.


--
-- TOC entry 3437 (class 0 OID 41188)
-- Dependencies: 220
-- Data for Name: member; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.member (mem_id, pla_id, mem_name, mem_lastname, mem_code, mem_phone, mem_email, mem_location, mem_password) FROM stdin;
1	1	Miembro A	Apellido A	Código A	1234567890	miembroA@example.com	Ubicación A	password123
2	2	Miembro B	Apellido B	Código B	9876543210	miembroB@example.com	Ubicación B	password456
\.


--
-- TOC entry 3438 (class 0 OID 41195)
-- Dependencies: 221
-- Data for Name: membership; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.membership (mbs_id, rou_id, mem_id, mbs_star_date, mbs_due_date, mbs_state) FROM stdin;
1	1	1	2023-11-01	2023-12-01	t
2	2	2	2023-11-02	2023-12-02	t
\.


--
-- TOC entry 3439 (class 0 OID 41203)
-- Dependencies: 222
-- Data for Name: owner; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.owner (own_id, own_name, own_lastname, own_email, own_password, own_role) FROM stdin;
1	Propietario A	Apellido A	propietarioA@example.com	password123	Rol A
2	Propietario B	Apellido B	propietarioB@example.com	password456	Rol B
\.


--
-- TOC entry 3440 (class 0 OID 41209)
-- Dependencies: 223
-- Data for Name: place; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.place (pla_id, pla_name, pla_location, pla_schedule, pla_classschedule, pla_type) FROM stdin;
1	Lugar A	Ubicación A	Horario A	Clase A	Tipo A
2	Lugar B	Ubicación B	Horario B	Clase B	Tipo B
\.


--
-- TOC entry 3441 (class 0 OID 41215)
-- Dependencies: 224
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (pro_id, inv_id, pro_name, pro_description, pro_cost, pro_stock, pro_category, pro_duration, pro_benefits) FROM stdin;
1	1	Producto A                    	Descripción Producto A        	$25,00	10	Categoría A	30	Beneficios A
2	2	Producto B                    	Descripción Producto B        	$35,00	15	Categoría B	60	Beneficios B
\.


--
-- TOC entry 3442 (class 0 OID 41222)
-- Dependencies: 225
-- Data for Name: reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservation (res_id, mem_id, pla_id, res_date, res_hour, res_state) FROM stdin;
1	1	1	2023-11-01	08:00:00	t
2	2	2	2023-11-02	07:30:00	t
\.


--
-- TOC entry 3443 (class 0 OID 41230)
-- Dependencies: 226
-- Data for Name: routine; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.routine (rou_id, mbs_id, rou_type, rou_name) FROM stdin;
1	1	Tipo A	Rutina A
2	2	Tipo B	Rutina B
\.


--
-- TOC entry 3223 (class 2606 OID 41148)
-- Name: attendance pk_attendance; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT pk_attendance PRIMARY KEY (att_id);


--
-- TOC entry 3228 (class 2606 OID 41156)
-- Name: details pk_details; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT pk_details PRIMARY KEY (det_id);


--
-- TOC entry 3232 (class 2606 OID 41163)
-- Name: donations pk_donations; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT pk_donations PRIMARY KEY (don_id);


--
-- TOC entry 3236 (class 2606 OID 41170)
-- Name: exercise pk_exercise; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT pk_exercise PRIMARY KEY (exe_id);


--
-- TOC entry 3239 (class 2606 OID 41177)
-- Name: invoice pk_invoice; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT pk_invoice PRIMARY KEY (inv_id);


--
-- TOC entry 3245 (class 2606 OID 41184)
-- Name: manage pk_manage; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT pk_manage PRIMARY KEY (pla_id, own_id);


--
-- TOC entry 3249 (class 2606 OID 41192)
-- Name: member pk_member; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT pk_member PRIMARY KEY (mem_id);


--
-- TOC entry 3254 (class 2606 OID 41199)
-- Name: membership pk_membership; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT pk_membership PRIMARY KEY (mbs_id);


--
-- TOC entry 3257 (class 2606 OID 41207)
-- Name: owner pk_owner; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.owner
    ADD CONSTRAINT pk_owner PRIMARY KEY (own_id);


--
-- TOC entry 3259 (class 2606 OID 41213)
-- Name: place pk_place; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.place
    ADD CONSTRAINT pk_place PRIMARY KEY (pla_id);


--
-- TOC entry 3263 (class 2606 OID 41219)
-- Name: product pk_product; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT pk_product PRIMARY KEY (pro_id);


--
-- TOC entry 3267 (class 2606 OID 41226)
-- Name: reservation pk_reservation; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT pk_reservation PRIMARY KEY (res_id);


--
-- TOC entry 3272 (class 2606 OID 41234)
-- Name: routine pk_routine; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT pk_routine PRIMARY KEY (rou_id);


--
-- TOC entry 3220 (class 1259 OID 41151)
-- Name: assist_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX assist_fk ON public.attendance USING btree (mem_id);


--
-- TOC entry 3221 (class 1259 OID 41149)
-- Name: attendance_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX attendance_pk ON public.attendance USING btree (att_id);


--
-- TOC entry 3246 (class 1259 OID 41194)
-- Name: belongs_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX belongs_fk ON public.member USING btree (pla_id);


--
-- TOC entry 3233 (class 1259 OID 41172)
-- Name: contains_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX contains_fk ON public.exercise USING btree (rou_id);


--
-- TOC entry 3225 (class 1259 OID 41157)
-- Name: details_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX details_pk ON public.details USING btree (det_id);


--
-- TOC entry 3229 (class 1259 OID 41164)
-- Name: donations_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX donations_pk ON public.donations USING btree (don_id);


--
-- TOC entry 3261 (class 1259 OID 41221)
-- Name: encompass_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX encompass_fk ON public.product USING btree (inv_id);


--
-- TOC entry 3234 (class 1259 OID 41171)
-- Name: exercise_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX exercise_pk ON public.exercise USING btree (exe_id);


--
-- TOC entry 3230 (class 1259 OID 41165)
-- Name: give_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX give_fk ON public.donations USING btree (mem_id);


--
-- TOC entry 3250 (class 1259 OID 41202)
-- Name: have_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX have_fk ON public.membership USING btree (mem_id);


--
-- TOC entry 3226 (class 1259 OID 41158)
-- Name: include_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX include_fk ON public.details USING btree (inv_id);


--
-- TOC entry 3237 (class 1259 OID 41178)
-- Name: invoice_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX invoice_pk ON public.invoice USING btree (inv_id);


--
-- TOC entry 3265 (class 1259 OID 41229)
-- Name: keep_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX keep_fk ON public.reservation USING btree (pla_id);


--
-- TOC entry 3270 (class 1259 OID 41236)
-- Name: make2_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX make2_fk ON public.routine USING btree (mbs_id);


--
-- TOC entry 3251 (class 1259 OID 41201)
-- Name: make_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX make_fk ON public.membership USING btree (rou_id);


--
-- TOC entry 3241 (class 1259 OID 41186)
-- Name: manage2_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX manage2_fk ON public.manage USING btree (own_id);


--
-- TOC entry 3242 (class 1259 OID 41187)
-- Name: manage_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX manage_fk ON public.manage USING btree (pla_id);


--
-- TOC entry 3243 (class 1259 OID 41185)
-- Name: manage_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX manage_pk ON public.manage USING btree (pla_id, own_id);


--
-- TOC entry 3247 (class 1259 OID 41193)
-- Name: member_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX member_pk ON public.member USING btree (mem_id);


--
-- TOC entry 3252 (class 1259 OID 41200)
-- Name: membership_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX membership_pk ON public.membership USING btree (mbs_id);


--
-- TOC entry 3255 (class 1259 OID 41208)
-- Name: owner_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX owner_pk ON public.owner USING btree (own_id);


--
-- TOC entry 3260 (class 1259 OID 41214)
-- Name: place_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX place_pk ON public.place USING btree (pla_id);


--
-- TOC entry 3240 (class 1259 OID 41179)
-- Name: possess_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX possess_fk ON public.invoice USING btree (mem_id);


--
-- TOC entry 3264 (class 1259 OID 41220)
-- Name: product_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX product_pk ON public.product USING btree (pro_id);


--
-- TOC entry 3224 (class 1259 OID 41150)
-- Name: register_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX register_fk ON public.attendance USING btree (pla_id);


--
-- TOC entry 3268 (class 1259 OID 41227)
-- Name: reservation_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX reservation_pk ON public.reservation USING btree (res_id);


--
-- TOC entry 3269 (class 1259 OID 41228)
-- Name: reserve_fk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX reserve_fk ON public.reservation USING btree (mem_id);


--
-- TOC entry 3273 (class 1259 OID 41235)
-- Name: routine_pk; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX routine_pk ON public.routine USING btree (rou_id);


--
-- TOC entry 3274 (class 2606 OID 41237)
-- Name: attendance fk_attendan_assist_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT fk_attendan_assist_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3275 (class 2606 OID 41242)
-- Name: attendance fk_attendan_register_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT fk_attendan_register_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3276 (class 2606 OID 41247)
-- Name: details fk_details_include_invoice; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT fk_details_include_invoice FOREIGN KEY (inv_id) REFERENCES public.invoice(inv_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3277 (class 2606 OID 41252)
-- Name: donations fk_donation_give_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.donations
    ADD CONSTRAINT fk_donation_give_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3278 (class 2606 OID 41257)
-- Name: exercise fk_exercise_contains_routine; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.exercise
    ADD CONSTRAINT fk_exercise_contains_routine FOREIGN KEY (rou_id) REFERENCES public.routine(rou_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3279 (class 2606 OID 41262)
-- Name: invoice fk_invoice_possess_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.invoice
    ADD CONSTRAINT fk_invoice_possess_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3280 (class 2606 OID 41272)
-- Name: manage fk_manage_manage2_owner; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT fk_manage_manage2_owner FOREIGN KEY (own_id) REFERENCES public.owner(own_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3281 (class 2606 OID 41267)
-- Name: manage fk_manage_manage_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.manage
    ADD CONSTRAINT fk_manage_manage_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3282 (class 2606 OID 41277)
-- Name: member fk_member_belongs_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.member
    ADD CONSTRAINT fk_member_belongs_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3283 (class 2606 OID 41282)
-- Name: membership fk_membersh_have_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_membersh_have_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3284 (class 2606 OID 41287)
-- Name: membership fk_membersh_make_routine; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.membership
    ADD CONSTRAINT fk_membersh_make_routine FOREIGN KEY (rou_id) REFERENCES public.routine(rou_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3285 (class 2606 OID 41292)
-- Name: product fk_product_encompass_invoice; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT fk_product_encompass_invoice FOREIGN KEY (inv_id) REFERENCES public.invoice(inv_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3286 (class 2606 OID 41297)
-- Name: reservation fk_reservat_keep_place; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservat_keep_place FOREIGN KEY (pla_id) REFERENCES public.place(pla_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3287 (class 2606 OID 41302)
-- Name: reservation fk_reservat_reserve_member; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservation
    ADD CONSTRAINT fk_reservat_reserve_member FOREIGN KEY (mem_id) REFERENCES public.member(mem_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


--
-- TOC entry 3288 (class 2606 OID 41307)
-- Name: routine fk_routine_make2_membersh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.routine
    ADD CONSTRAINT fk_routine_make2_membersh FOREIGN KEY (mbs_id) REFERENCES public.membership(mbs_id) ON UPDATE RESTRICT ON DELETE RESTRICT;


-- Completed on 2023-11-04 14:54:34

--
-- PostgreSQL database dump complete
--


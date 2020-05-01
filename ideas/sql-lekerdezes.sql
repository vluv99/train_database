DECLARE
    v_fizetes TRAINDB.Dolgozo.fizetese%TYPE;
    v_nev TRAINDB.dolgozo.nev%TYPE;
    
BEGIN
    v_fizetes :=130000;
    SELECT nev
    INTO v_nev
    FROM dolgozo
    WHERE fizetese = v_fizetes;
    DBMS_OUTPUT.PUT_LINE(v_nev|| ' ' || v_fizetes);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Nincs ilyen fizetés');
    WHEN TOO_MANY_ROWS THEN
        DBMS_OUTPUT.PUT_LINE('Több embernek is ez a fizetése');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Egyéb hiba');
END;


DECLARE
    v_avgfizetes TRAINDB.Dolgozo.fizetese%TYPE;
    szoveg VARCHAR2(50);
BEGIN
    SELECT AVG(fizetese)
    INTO v_avgfizetes
    FROM dolgozo;
    IF v_avgfizetes < 130000 THEN
        szoveg:='kevesebb mint szazharmincezer';
    ELSIF (v_avgfizetes> 130000) AND (v_avgfizetes <= 180000) THEN
        szoveg:='szazharmincezer es szaznyolcvanezer kozt';
    ELSE
        szoveg:='szaznyolcvanezer folott';
    END IF;
    DBMS_OUTPUT.PUT_LINE(szoveg);
END;
ITT azt szeretném lekérdezni hogy kik azok akiket jovahagytak szabadsag szempontjabol, akinek a jovahagyott = 0, ott kiírja a dolgozó nevét (ez a select utasítás működik)

DECLARE

Select nev,jovahagyott from dolgozo,szabadsag
where szabadsag.dolgozo = dolgozo.id 
AND jovahagyott = '0'


DECLARE
v_nev TRAINDB.dolgozo.nev%TYPE
BEGIN
Select nev from dolgozo
where dolgozo.szuletesi_datum >'72-MÁRC. -22'
DBMS_OUTPUT.PUT_LINE(v_nev)
END;


/EZ MUKODIK !!!!! HUHUU/
SET SERVEROUTPUT ON;
DECLARE
v_nev TRAINDB.dolgozo.nev%TYPE;
Cursor szul is
Select nev into v_nev from TRAINDB.dolgozo
where dolgozo.szuletesi_datum > ('72-MÁRC. -22');
BEGIN
open szul;
LOOP 
FETCH szul 
INTO v_nev ;
exit when szul%notfound;
DBMS_OUTPUT.PUT_LINE(v_nev);
END LOOP;
Close szul;
END



	
	
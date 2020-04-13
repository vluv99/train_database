CREATE OR REPLACE FUNCTION SUMstring_to_times (str in varchar2, str2 in varchar2) return res is
begin
    h1 := to_number( SUBSTR(str, 0 , 2));
    p1 := to_NUMBER( SUBSTR(str, ': ' ));
    h2 := to_number( SUBSTR(str, 0 , 2));
    p2 := to_NUMBER( SUBSTR(str2, ': ' ));

    res1 := h1+h2;
    res2 := p1+p2;
    IF (res2 >= 60) 
    THEN{
        t := res2 % 60;
        res2 -= t*60; 
        res1 += t;
    }
    END IF;
    return (to_char(res1) || ':' || to_char(res2));
end


select allomas.neve, menetrend.indulasi_ido, utak.ido, SUMstring_to_times(menetrend.indulasi_ido, megallo.erkezik_ido) as ERKEZIK
from allomas, menetrend, utak
where menetrend.id = megallo.allomas and 
    allomas.id = megallo.allomas and 
    megallo.erkezik_ido = '00:00' and  
    megallo.jarat = utak.id
group by allomas.neve;


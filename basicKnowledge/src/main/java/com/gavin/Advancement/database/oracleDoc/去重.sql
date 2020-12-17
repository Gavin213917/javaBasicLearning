with
jlb as (select * from (
select t.qxbm,t.sfsq,row_number() OVER(PARTITION BY t.qxbm,t.sfsq,t.zjlx,t.zjhm order by t.sfrq desc) rn
from T_C5_TNBHZJHBSC t
)
where rn = 1)
select t.qxbm,t.sfsq, count(1) from jlb t
group by t.qxbm,t.sfsq
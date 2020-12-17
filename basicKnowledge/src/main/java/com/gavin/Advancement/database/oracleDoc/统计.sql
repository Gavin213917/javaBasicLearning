--with
--全市
--jlb as (select t.qxbm,sum(case when t.sfjhbhz = '1' then 1 else 0 end) sfjhbhz,t.zjlx,t.zjhm from T_C5_XHFHJLB t where 1=1 group by t.qxbm,t.zjlx,t.zjhm ),

--select t.qxbm,sum(t.sfjhbhz) from jlb t group by t.qxbm

--select * from T_C5_XHFHJLB t where t.qxbm = '310101000000' and t.sfjhbhz = '1'--110101195903160014

--select t.qxbm,t.zjhm from T_C5_TNBHZJHBSC t  left join T_C5_XHFHJLB t1 on t1.qxbm = t.qxbm where t.qxbm = '310101000000'
--按区县
with jlb as (select t.qxbm,t.jgdm,sum(case when t.sfjhbhz = '1' then 1 else 0 end) sfjhbhz,t.zjlx,t.zjhm from T_C5_XHFHJLB t where 1=1 group by t.qxbm,t.jgdm,t.zjlx,t.zjhm ),

scb as (select t.qxbm,t1.cname scdw,--t.zjlx,t.zjhm,
            sum(t1.sfjhbhz) xyjhbhz,
            sum(case when t.kskt = '1' then 1 else 0 end) yzz,
            sum(case when t.kskt = '0' then 1 else 0 end) wzz,
            sum(case when t.xpjcjhb = '1' then 1 else 0 end) xpjcjhb,
            sum(case when t.xxjcjgjhb = '1' then 1 else 0 end) zc,
            sum(case when t.xxjcjgjhb = '2' then 1 else 0 end) ysjh,
            sum(case when t.xxjcjgjhb = '3' then 1 else 0 end) qtjb,
            sum(case when t.xxjcjgjhb = '4' then 1 else 0 end) swmqzd,
            sum(case when t.zzzdjgjhb = '1' then 1 else 0 end) qzjhhz,
            sum(case when t.zzzdjgjhb = '2' then 1 else 0 end) wqzjhhz
        from T_C5_TNBHZJHBSC t
        left join tb_dic_yljg t1 on t1.yljgdm = t.sfsq
        left join jlb t1 on t1.qxbm = t.qxbm
        where 1=1  and to_char(t.sfrq,'yyyy-mm-dd') >= '2020-01-01'
        group by t.qxbm,t1.cname) ,


YLJG AS (select t.code, t.name from cf_code_info t where t.removed = '0'  and t.code_info_id = (select id from cf_code_info where removed = '0' and code = 'qxbm_bb')),

tab as ( select Y.NAME AS qxbm,sc.scdw,'' AS GLTHBHZS,'' AS WCTNBSFHZS,
           nvl(sc.XYJHBHZ,0) AS XYJHBHZ,nvl(sc.YZZ,0) AS YZZ,nvl(sc.WZZ,0) AS WZZ,
           nvl(sc.XPJCJHB,0) AS XPJCJHB,nvl(sc.ZC,0) AS ZC,nvl(sc.YSJH,0) AS YSJH,nvl(sc.QTJB,0) AS QTJB,nvl(sc.SWMQZD,0) AS SWMQZD,
           nvl(sc.QZJHHZ,0) AS QZJHHZ,nvl(sc.WQZJHHZ,0) AS WQZJHHZ
          from scb sc right join YLJG Y on Y.code = sc.qxbm
          where 1=1 and sc.qxbm = '310101000000'),

hj as (select '合计','-','' GLTHBHZS,'' WCTNBSFHZS,SUM(tab.XYJHBHZ),SUM(tab.YZZ),SUM(tab.WZZ),SUM(tab.XPJCJHB),SUM(tab.ZC),SUM(tab.YSJH),SUM(tab.QTJB),SUM(tab.SWMQZD),SUM(tab.QZJHHZ),SUM(tab.WQZJHHZ) from tab )

SELECT t.* FROM tab t  UNION ALL  SELECT a.* FROM hj a
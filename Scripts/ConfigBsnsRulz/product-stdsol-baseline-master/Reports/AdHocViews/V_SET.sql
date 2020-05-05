
  CREATE OR REPLACE FORCE VIEW "ACCELA"."V_SET" ("AGENCY_ID", "UPDATED_BY", "UPDATED_DATE", "ADDRESS_REF_ID", "LICENSE_REF_ID", "MEMBER_SET_ID", "PARCEL_REF_ID", "RECORD_ID", "RECORD_MODULE", "RECORD_NAME", "RECORD_OPEN_DATE", "RECORD_STATUS", "RECORD_STATUS_DATE", "RECORD_TYPE", "RECORD_SET_TYPE", "SET_COMMENTS", "SET_ID", "SET_NAME", "SET_TYPE", "SET_DATE", "SET_STATUS", "SET_STATUS_DATE", "SET_STATUS_COMMENT", "SOURCE_ID", "T_ID1", "T_ID2", "T_ID3") AS 
  SELECT
  C.SERV_PROV_CODE                  AS AGENCY_ID
--=== Row Update Info
  ,COALESCE(B.REC_FUL_NAM,C.REC_FUL_NAM)
                                    AS UPDATED_BY
  ,COALESCE(B.REC_DATE,C.REC_DATE)  AS UPDATED_DATE
--=== Set and Member Info  
  ,B.L1_ADDRESS_NBR                 AS ADDRESS_REF_ID
  ,B.LIC_SEQ_NBR                    AS LICENSE_REF_ID
  ,B.CHILD_SET_ID                   AS MEMBER_SET_ID
  ,B.L1_PARCEL_NBR                  AS PARCEL_REF_ID
  ,A.B1_ALT_ID                      AS RECORD_ID
  ,A.B1_PER_GROUP                   AS RECORD_MODULE
  ,A.B1_SPECIAL_TEXT                AS RECORD_NAME  
  ,A.B1_FILE_DD                     AS RECORD_OPEN_DATE
  ,A.B1_APPL_STATUS                 AS RECORD_STATUS 
  ,A.B1_APPL_STATUS_DATE            AS RECORD_STATUS_DATE
  ,A.B1_APP_TYPE_ALIAS              AS RECORD_TYPE  
  ,C.RECORD_SET_TYPE                AS RECORD_SET_TYPE
  ,C.SET_COMMENT                    AS SET_COMMENTS
  ,C.SET_ID                         AS SET_ID
  ,C.SET_TITLE                      AS SET_NAME
  ,C.SET_TYPE                       AS SET_TYPE
  ,C.SET_DATE                       AS SET_DATE
  ,C.SET_STATUS                     AS SET_STATUS
  ,C.SET_STATUS_DATE                AS SET_STATUS_DATE
  ,C.SET_STATUS_COMMENT             AS SET_STATUS_COMMENT
  ,B.SOURCE_SEQ_NBR                 AS SOURCE_ID
  ,A.B1_PER_ID1 AS T_ID1
  ,A.B1_PER_ID2 AS T_ID2
  ,A.B1_PER_ID3 AS T_ID3
FROM
  SETHEADER C
  LEFT JOIN
  SETDETAILS B
    ON  C.SERV_PROV_CODE=B.SERV_PROV_CODE
    AND C.SET_ID=B.SET_ID
  LEFT JOIN  
  B1PERMIT A 
    ON  A.SERV_PROV_CODE=B.SERV_PROV_CODE 
    AND A.B1_PER_ID1=B.B1_PER_ID1 
    AND A.B1_PER_ID2=B.B1_PER_ID2 
    AND A.B1_PER_ID3=B.B1_PER_ID3 
    AND A.REC_STATUS='A';

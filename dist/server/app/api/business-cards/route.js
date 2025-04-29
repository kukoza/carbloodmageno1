(()=>{var e={};e.id=1310,e.ids=[1310],e.modules={13878:e=>{function t(e){var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}t.keys=()=>[],t.resolve=t,t.id=13878,e.exports=t},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},30517:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},82361:e=>{"use strict";e.exports=require("events")},41808:e=>{"use strict";e.exports=require("net")},77282:e=>{"use strict";e.exports=require("process")},12781:e=>{"use strict";e.exports=require("stream")},71576:e=>{"use strict";e.exports=require("string_decoder")},39512:e=>{"use strict";e.exports=require("timers")},24404:e=>{"use strict";e.exports=require("tls")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},59796:e=>{"use strict";e.exports=require("zlib")},14622:(e,t,r)=>{"use strict";r.r(t),r.d(t,{headerHooks:()=>m,originalPathname:()=>y,patchFetch:()=>C,requestAsyncStorage:()=>T,routeModule:()=>R,serverHooks:()=>A,staticGenerationAsyncStorage:()=>E,staticGenerationBailout:()=>b});var a={};r.r(a),r.d(a,{GET:()=>l,POST:()=>p});var s=r(95419),n=r(69108),o=r(99678),i=r(78070),c=r(47033),d=r(7439),_=r(46082);async function u(){try{try{return await (0,c.JT)("SELECT 1 FROM business_cards LIMIT 1"),{exists:!0}}catch(e){return await (0,c.JT)(`
        CREATE TABLE IF NOT EXISTS business_cards (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          name_th VARCHAR(255),
          name_en VARCHAR(255),
          position_th VARCHAR(255),
          position_en VARCHAR(255),
          department_th VARCHAR(255),
          department_en VARCHAR(255),
          company_th VARCHAR(255),
          company_en VARCHAR(255),
          branch VARCHAR(255),
          address_th TEXT,
          address_en TEXT,
          branch_address_th TEXT,
          branch_address_en TEXT,
          tel VARCHAR(100),
          company_tel VARCHAR(100),
          fax VARCHAR(100),
          email VARCHAR(255),
          website VARCHAR(255),
          line_id VARCHAR(100),
          facebook VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `),{exists:!1,created:!0}}}catch(e){throw console.error("Error ensuring table exists:",e),e}}async function h(){try{try{await (0,c.JT)("SELECT branch, company_tel FROM business_cards LIMIT 1")}catch(e){try{await (0,c.JT)(`
          ALTER TABLE business_cards 
          ADD COLUMN branch VARCHAR(255) AFTER company_en,
          ADD COLUMN company_tel VARCHAR(100) AFTER tel
        `)}catch(e){console.error("Error adding branch and company_tel columns:",e)}}try{await (0,c.JT)("SELECT branch_address_th, branch_address_en FROM business_cards LIMIT 1")}catch(e){try{await (0,c.JT)(`
          ALTER TABLE business_cards 
          ADD COLUMN branch_address_th TEXT AFTER address_en,
          ADD COLUMN branch_address_en TEXT AFTER branch_address_th
        `)}catch(e){console.error("Error adding branch_address columns:",e)}}return{success:!0}}catch(e){throw console.error("Error checking columns:",e),e}}async function l(e){try{await u(),await h();let e=(0,d.cookies)().get("auth_token");if(!e)return i.Z.json({error:"Unauthorized"},{status:401});let t=(0,_.verify)(e.value,process.env.JWT_SECRET||"your-secret-key").id;try{let e=await (0,c.jB)("SELECT * FROM business_cards WHERE user_id = ?",[t]);if(!e){let e=await (0,c.jB)("SELECT name, email, phone FROM users WHERE id = ?",[t]);if(!e)return i.Z.json({error:"User not found"},{status:404});return i.Z.json({id:null,user_id:t,name_th:e.name||"",name_en:"",position_th:"",position_en:"",department_th:"",department_en:"",company_th:"บริษัท โนโซมิ เอ็นเตอร์ไพรส์ (ประเทศไทย) จำกัด",company_en:"NOZOMI ENTERPRISE (THAILAND) CO., LTD.",branch:"สำนักงานใหญ่",address_th:"382 หมู่ 4 ตำบลคลองสวน",address_en:"382 M.4 Baanklongsuan, Phrasamutjede/Samutprakarn 10290 Thailand",branch_address_th:"168 หมู่ 2 ตำบลคลองสวน",branch_address_en:"168 M.2 Baanklongsuan, Phrasamutjede/Samutprakarn 10290 Thailand",tel:e.phone||"",company_tel:"02-461-6291",fax:"02-461-6292",email:e.email||"",website:"www.nozomigroup.co.th",line_id:"",facebook:"",created_at:null,updated_at:null})}return i.Z.json(e)}catch(r){console.error("Error querying business card:",r),await (0,c.JT)(`
        CREATE TABLE IF NOT EXISTS business_cards (
          id INT AUTO_INCREMENT PRIMARY KEY,
          user_id INT NOT NULL,
          name_th VARCHAR(255),
          name_en VARCHAR(255),
          position_th VARCHAR(255),
          position_en VARCHAR(255),
          department_th VARCHAR(255),
          department_en VARCHAR(255),
          company_th VARCHAR(255),
          company_en VARCHAR(255),
          branch VARCHAR(255),
          address_th TEXT,
          address_en TEXT,
          branch_address_th TEXT,
          branch_address_en TEXT,
          tel VARCHAR(100),
          company_tel VARCHAR(100),
          fax VARCHAR(100),
          email VARCHAR(255),
          website VARCHAR(255),
          line_id VARCHAR(255),
          facebook VARCHAR(255),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);let e=await (0,c.jB)("SELECT name, email, phone FROM users WHERE id = ?",[t]);if(!e)return i.Z.json({error:"User not found"},{status:404});return i.Z.json({id:null,user_id:t,name_th:e.name||"",name_en:"",position_th:"",position_en:"",department_th:"",department_en:"",company_th:"บริษัท โนโซมิ เอ็นเตอร์ไพรส์ (ประเทศไทย) จำกัด",company_en:"NOZOMI ENTERPRISE (THAILAND) CO., LTD.",branch:"สำนักงานใหญ่",address_th:"382 หมู่ 4 ตำบลคลองสวน",address_en:"382 M.4 Baanklongsuan, Phrasamutjede/Samutprakarn 10290 Thailand",branch_address_th:"168 หมู่ 2 ตำบลคลองสวน",branch_address_en:"168 M.2 Baanklongsuan, Phrasamutjede/Samutprakarn 10290 Thailand",tel:e.phone||"",company_tel:"02-461-6291",fax:"02-461-6292",email:e.email||"",website:"www.nozomigroup.co.th",line_id:"",facebook:"",created_at:null,updated_at:null})}}catch(e){return console.error("Error fetching business card:",e),i.Z.json({error:"Failed to fetch business card",details:e},{status:500})}}async function p(e){try{await u(),await h();let t=(0,d.cookies)().get("auth_token");if(!t)return i.Z.json({error:"Unauthorized"},{status:401});let r=(0,_.verify)(t.value,process.env.JWT_SECRET||"your-secret-key").id,a=await e.json(),s=await (0,c.jB)("SELECT id FROM business_cards WHERE user_id = ?",[r]);if(s){let e=s.id,t=`
        UPDATE business_cards SET
          name_th = ?, name_en = ?, position_th = ?, position_en = ?,
          department_th = ?, department_en = ?, company_th = ?, company_en = ?, branch = ?,
          address_th = ?, address_en = ?, branch_address_th = ?, branch_address_en = ?,
          tel = ?, company_tel = ?, fax = ?, email = ?,
          website = ?, line_id = ?, facebook = ?
        WHERE id = ?
      `,r=[a.name_th,a.name_en,a.position_th,a.position_en,a.department_th,a.department_en,a.company_th,a.company_en,a.branch,a.address_th,a.address_en,a.branch_address_th,a.branch_address_en,a.tel,a.company_tel,a.fax,a.email,a.website,a.line_id,a.facebook,e];await (0,c.JT)(t,r);let n=await (0,c.jB)("SELECT * FROM business_cards WHERE id = ?",[e]);return i.Z.json(n)}{let e=`
        INSERT INTO business_cards (
          user_id, name_th, name_en, position_th, position_en, 
          department_th, department_en, company_th, company_en, branch,
          address_th, address_en, branch_address_th, branch_address_en,
          tel, company_tel, fax, email, website, 
          line_id, facebook
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,t=[r,a.name_th,a.name_en,a.position_th,a.position_en,a.department_th,a.department_en,a.company_th,a.company_en,a.branch,a.address_th,a.address_en,a.branch_address_th,a.branch_address_en,a.tel,a.company_tel,a.fax,a.email,a.website,a.line_id,a.facebook],s=(await (0,c.Fm)(e,t)).insertId,n=await (0,c.jB)("SELECT * FROM business_cards WHERE id = ?",[s]);return i.Z.json(n)}}catch(e){return console.error("Error saving business card:",e),i.Z.json({error:"Failed to save business card",details:e},{status:500})}}let R=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/business-cards/route",pathname:"/api/business-cards",filename:"route",bundlePath:"app/api/business-cards/route"},resolvedPagePath:"C:\\xampp\\htdocs\\car-booking-system-110\\car-booking-system-110\\app\\api\\business-cards\\route.ts",nextConfigOutput:"standalone",userland:a}),{requestAsyncStorage:T,staticGenerationAsyncStorage:E,serverHooks:A,headerHooks:m,staticGenerationBailout:b}=R,y="/api/business-cards/route";function C(){return(0,o.patchFetch)({serverHooks:A,staticGenerationAsyncStorage:E})}},47033:(e,t,r)=>{"use strict";r.d(t,{Fm:()=>d,JT:()=>i,jB:()=>c});var a=r(63069);let s={host:"43.229.132.209",user:process.env.DB_USER||"rootforbook",password:process.env.DB_PASSWORD||"534jj7?cA",database:process.env.DB_NAME||"carbookingsystem",waitForConnections:!0,connectionLimit:10,queueLimit:0},n=null;async function o(){if(!n)try{console.log("Creating database pool with config:",{host:s.host,user:s.user,database:s.database}),n=a.createPool(s),(await n.getConnection()).release(),console.log("Database pool created and tested successfully")}catch(e){throw console.error("Error creating database pool:",e),Error(`Database connection failed: ${e instanceof Error?e.message:String(e)}`)}return n}async function i(e,t=[]){try{let r=await o();console.log("Executing query:",e,"with params:",t);let[a]=await r.execute(e,t);return{recordset:a}}catch(e){throw console.error("Query execution error:",e),e}}async function c(e,t=[]){try{let{recordset:r}=await i(e,t);return r.length>0?r[0]:null}catch(e){throw console.error("Query execution error:",e),e}}async function d(e,t=[]){try{let r=await o();console.log("Executing insert:",e,"with params:",t);let[a]=await r.execute(e,t);return{insertId:a.insertId}}catch(e){throw console.error("Insert execution error:",e),e}}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),a=t.X(0,[1638,6206,3069,7439,6082],()=>r(14622));module.exports=a})();
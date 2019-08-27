## BreedPop

#Restful Api

* POST /signup ( 유저 회원가입 )

> Parmas

    id : {type: String, unique: true}, // 아이디
    
    passwd : {type : String}, // 비밀번호

> Response

    HTTP 200 : { message: "success!"}

    HTTP 409 : { message : "already exist"}

    HTTP 400 : { message : e.message } // 나올 일 없음

* POST /signin ( 유저 로그인 )

> Params

    id : { type : String } // 유저 아이디

    passwd : { type : String } // 유저 비밀번호

> Response

    HTTP 200 : { user :
    
      id : {type: String, unique: true}, // 아이디
      
      passwd : {type : String},
      
      token : {type: String}, // 토큰
     } 

    HTTP 404 : { message : "User Not Found!"}


* POST /cm/write (CM, Campaign, MV (/cm과 /campaign 과 /mv 가 있음)

> Params

    title :  {type: String, require: true} // 제목

    brand :  {type: String, require: true} // 브랜드

    agency : {type: String, require: true} // 광고

    production : {type: String, require: true} // 프로덕션
    
    imageUrl :   {type: String, require: true} // 이미지 주소 (Base64 INPUT)
     
    list: [  // Array List
    {
    
      title : {type: String},        // 제목
      
      subTitle: {type: String},      // 소제목
      
      videoUrl: {type: String},      // 비디오 URL (YOUTUBE URL)
      
      image: {type: String},         // 이미지 주소 (BASE64 INPUT)
      
      text: {type: String}           // 들어갈 요소 텍스트 (글 내용)
      
    }
    ]
  
    
> Response

    HTTP 200 : { message : "success!"} {
 
      token :  {type: String, require: true} // 토큰
      
      docNum : {type: Number} //독스 번호
      
    }

    HTTP 500 : { message : "ERR!"}
    
    
    

* POST /cm/change (CM, Campaign, MV (/cm과 /campaign 과 /mv 가 있음)

> Params

    title :  {type: String, require: true} // 제목

    brand :  {type: String, require: true} // 브랜드

    agency : {type: String, require: true} // 광고

    production : {type: String, require: true} // 프로덕션
    
    imageUrl :   {type: String, require: true} // 이미지 주소 (Base64 INPUT)
    
    list: [  // Array List
    {
    
      title : {type: String},        // 제목
      
      subTitle: {type: String},      // 소제목
      
      videoUrl: {type: String},      // 비디오 URL (YOUTUBE URL)
      
      image: {type: String},         // 이미지 주소 (BASE64 INPUT)
      
      text: {type: String}           // 들어갈 요소 텍스트 (글 내용)
      
    }
    ]
  
    token :  {type: String, require: true} // 토큰
    
> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}
    
    
    
    

* POST /cm/del (CM, Campaign, MV (/cm과 /campaign 과 /mv 가 있음)

> Params

    token :  {type: String, require: true} // 토큰
    
> Response

    HTTP 200 : { message : "success!"}

    HTTP 500 : { message : "ERR!"}




* POST /cm/search/:title (CM, Campaign, MV (/cm과 /campaign 과 /mv 가 있음)

> Params

     title :  {type: String, require: true} // 제목
    
> Response (ex. c를 검색했을때)

    HTTP 200 : { message : "success!"}{
            "title": "cm",
            "brand": "cm",
            "agency": "cm",
            "production": "cm",
            "imageUrl": "cm",
            "token": "rB46H9ubhhep1V3bmy91MFD"
    }

    HTTP 500 : { message : "ERR!"}




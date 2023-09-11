import { AxiosHeaders } from "axios";
import service  from "..";



//获取用户详情
export function getLoginUser(data){
    return service({
        method:"GET",
        url:`/getUser?token=${data}`
    })
}
//
export function getProblems(data){
    return service({
        method:"GET",
        url:`/problems?pageNum=${data}&pageSize=10`
    })
}
export function getallProblems(){
    return service({
        method:"GET",
        url:`/problems?pageNum=1&pageSize=500`,
        headers: {
            
            'Authorization111': '333333',// 替换为实际的授权令牌
            "tokenHead": "UVW",
            "token": "22222"
          }
    })
}
//添加题目
export function postProblem(data,grade,description,input,output){
    return service({
        method:"POST",
        url:`/problems`,
        data:{
            "accept": 0,
            "acceptUserNumber": 0,
            "description": description,
            "grade": grade,
            "id": 0,
            "input": input,
            "output": output,
            "starNumber": 0,
            "submit": 0,
            "submitUserNumber": 0,
            "title": data
        }
    })
}
//发布问题下的讨论
export function postPublishForum(pid,title,content,uid){
    console.log("********",pid,title,content)
    return service({
        method:"POST",
        url:`/forums/aboutProblem`,
        data:{
            "contest": content,
            "pid": pid,
            "tile": title,
            "uid": uid
        }
    })
}
//获得题目对应的讨论区
export function getQuestionforum(pid){
    return service({
        method:"GET",
        url:`/forums/aboutProblemId?pid=${pid}`
    })
}
//获得所有的帖子
export function getAllforum(){
    return service({
        method:"GET",
        url:`/forums/?pageNum=1&pageSize=999`
    })
}
//获得某个用户的帖子
export function getownforum(uid){
    return service({
        method:"GET",
        url:`/forums/aboutProblem?uid=${uid}`
    })
}
//删除某个用户的帖子
export function deleteforum(fid,uid){
    return service({
        method:"DELETE",
        url:`/forums/delete?fid=${fid}&uid=${uid}`
    })
}
//获得某个帖子下所有评论
export function getcomment(id){
    return service({
        method:"GET",
        url:`/comment/forumComment?id=${id}`
    })
}
//用户在某个帖子下评论
export function postcomment(comment,fid,uid){
    return service({
        method:"POST",
        url:`/comment/sendComment`,
        data:{
            "content":comment,
            "fid":fid,
            "uid":uid
        }
    })
}
//提交代码
export function postcode(code,pid,uid){
    return service({
        method:"POST",
        url:`/problems/UserSubmit`,
        data:{
            "code":code,
            "pid":pid,
            "uid":"共享心跳"
        }
    })
}
//用户登录
export function postlogin(username,pwd){
    return service({
        method:"POST",
        url:`/login`,
        data:{
            "pwd":pwd,
            "username":username
        }
    })
}
//邮箱注册
export function postemail(email){
    return service({
        method:"POST",
        url:`/common/email?email=${email}`,
        
    })
}
//用户签到
export function postexp(exp,email){
    return service({
        method:"POST",
        url:`/sign`,
        data:{
            "exp":exp,
            "uid":email
        }
    })
}
//用户注册
export function postregister(obj){
    return service({
        method:"POST",
        url:`/register`,
        data:{
            "birthday": obj.birthday,
            "emil": obj.security,
            "exp": 0,
            "id": obj.email,
            "name": obj.name,
            "number": obj.number,
            "pwd": obj.password,
            "salt": "string",
            "sex": obj.gender,
            "sign": 0,
            "status": "string"
          }
    })
}

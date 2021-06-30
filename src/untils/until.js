const IsStage = that => {
    //设置后台白名单，区分年级，班级，搜索触发的是学生列表页还是录入展示页
    const stage = ['/stageInfoList','/stageAddInfo','/stageAddRace'];
    if(stage.indexOf(that.$route.path)!=-1){
        if(that.$route.path!='/stageInfoList') that.$router.push('/stageInfoList'); 
    }else{
        if(that.$route.path!='/studentList') that.$router.push('/'); 
    }
}
export {IsStage}
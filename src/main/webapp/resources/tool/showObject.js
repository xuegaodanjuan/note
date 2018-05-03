function ShowTheObject(obj)
{
    var des = "";
    for(var name in obj)
    {
        des += name + ":" + obj[name] + ";\n";
    }
    console.log("##############################################");
    console.log(des);
    console.log("##############################################");
}
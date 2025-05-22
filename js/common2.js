;(function () {
    
// let str = "123.456";
// let num = Number(str);
// let roundedNum = Math.round(num);
// console.log(roundedNum); // 输出: 123
function toInter(str){
    let num = Number(str);
    return  Math.round(num);
}
function toCode(str, lsb, intNum, codeLength) {
    // 将字符串转换为数字
    let num= +str
    let res =  toInter(num/lsb)
    if(res<0){
       res = Math.pow(2, intNum)+res
    }
  

 res =res.toString(16).toUpperCase().padStart(codeLength, '0')
 console.log(res);
 return res;
}


let resStr='EB9060'
let  resObj={}
// js/common.js 或其他适当的 JS 文件
document.getElementById('inertial-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为

    // 获取表单数据
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // 这里可以添加你的逻辑，例如：
    console.log(data);

    // 可以在这里发送数据到服务器或其他操作
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            console.log(`Key: ${key}, Value: ${data[key]}`);
            switch (key) {
                

                case 'pitch-angle':                    
                case 'roll-angle':                    
                case 'true-heading':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 0.0054931640625, 16, 4)  
                    break;
                   case 'pitch-rate':
                case 'roll-rate':                    
                case 'yaw-rate':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 0.003662109, 16, 4)  
                    break;
                    //惯导东向加速度
                case 'accel-east':
                //惯导北向加速度
                case 'accel-north':
                //惯导天向加速度
                case 'accel-up':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 0.0003051, 16, 4)  
                    break;
                //惯导经度
                case 'longitude':
                    //纬度
                case 'latitude':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 8.3819028e-8, 32, 8)  
                    break;
                //altitude 高度
                case 'altitude':
                    //ellipsoid-height 惯导接收机椭球高度椭球高度
                case 'ellipsoid-height':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 0.01, 32, 8)  
                    break;    
                //east-velocity 东向速度
                case 'east-velocity':
                    //北向速度
                case 'north-velocity':
                //天向速度
                case 'up-velocity':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 0.001, 32, 8)  
                    break;

                   
                    // vacuum-speed 真空速
                case 'vacuum-speed':
                    // calibrated-speed 校准空速
                case 'calibrated-speed':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 1/16, 16, 4)  
                    break;
                    // vertical-speed 升降速度
                case 'vertical-speed':
                    // true-total-pressure 真实全压
                    //true-static-pressure 真实静压
                case 'true-static-pressure':
                case 'true-total-pressure':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 1/256, 16, 4)  
                    break;
                    // mach-number 马赫数
                case 'mach-number':
                        console.log(`Inertial: ${data[key]}`);
                        resObj[key]= toCode(data[key], 1/16384, 16, 4)  
                        break;
                           // true-dynamic-pressure 真实动压
                case 'true-dynamic-pressure': 
                // true-attack-angle 真攻角
                case 'true-attack-angle':
                    //true-sideslip-angle 真侧滑角
                case 'true-sideslip-angle':
                        console.log(`Inertial: ${data[key]}`);
                        resObj[key]= toCode(data[key], 1/512, 16, 4)  
                        break;

                 //total-air-temperature 大气总温度 
                case 'total-air-temperature':
                 //大气静温                
                case 'static-air-temperature':
                    console.log(`Inertial: ${data[key]}`);
                        resObj[key]= toCode(data[key], 0.01, 16, 4)  
                        break;    
                        case 'mach-number':
                            console.log(`Inertial: ${data[key]}`);
                            resObj[key]= toCode(data[key], 1/16384, 16, 4)  
                            break;
                 //pressure-altitude 气压高度

                 case 'pressure-altitude':
                    console.log(`Inertial: ${data[key]}`);
                    resObj[key]= toCode(data[key], 1, 16, 4)  
                    break;            
                  
                case 'otherField':
                    // 处理其他字段
                    console.log(`Other Field: ${data[key]}`);
                    break;
                default:
                    console.log(`Unknown field: ${key}, Value: ${data[key]}`);
            }
        }
    }
});

// 添加事件监听器，监听 id="data-validity" 下复选框的选中状态变化
const checkboxValues = new Array(16).fill(0);
document.querySelectorAll('#data-validity input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
        this.value = this.checked ? '1' : '0';
        // 更新 checkboxValues 数组
        checkboxValues[index] = +this.value;
        console.log(checkboxValues); // 输出数组内容以便验证
    });
});

console.log(checkboxValues); // 输出数组内容以便验证 转成str后 倒序不用转16进制

const checkboxValues2 = new Array(2).fill(0);
document.querySelectorAll('#data-validity2 input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
        this.value = this.checked ? '1' : '0';
        // 更新 checkboxValues 数组
        checkboxValues2[index] = +this.value;
        console.log(checkboxValues2); // 输出数组内容以便验证
    });
});
//checkboxValues2 转成str后 倒序 转16进制 

// data-validity3
// 添加事件监听器，监听 id="data-validity" 下复选框的选中状态变化
const checkboxValues3 = new Array(16).fill(0);
document.querySelectorAll('#data-validity3 input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
        this.value = this.checked ? '1' : '0';
        // 更新 checkboxValues 数组
        checkboxValues3[index] = +this.value;
        console.log(checkboxValues3); // 输出数组内容以便验证
    });
});

//其他状态内容
const checkboxValues4 = new Array(8).fill(0);
document.querySelectorAll('#data-validity4 input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener('change', function () {
        this.value = this.checked ? '1' : '0';
        // 更新 checkboxValues 数组
        checkboxValues4[index] = +this.value;
        console.log(checkboxValues4); // 输出数组内容以便验证
    });
});

}) ()
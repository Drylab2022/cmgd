const max=65535*65535;
let result=0;
for(let index=1;index<=max;index++)
{
    result=result+1/index/2;
}
console.log(result)
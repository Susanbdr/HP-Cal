var doubleRunPowerRequired = {
  one: {
    six: 0.042,
    eight: 0.076,
    ten: 0.114,
    twelve: 0.18
  },

  two: {
    six: 0.062,
    eight: 0.113,
    ten: 0.17,
    twelve: 0.18,
  },

  three: 
  {
    six: 0.085,
    eight: 0.167 ,
    ten: 0.25,
    twelve: 0.397
  },

  four: {
    six: 0.12,
    eight: 0.222,
    ten: 0.333,
    twelve: 0.524
  },

  five: {
    six: 0.15,
    eight: 0.27,
    ten: 0.405,
    twelve: 0.629
  },
};

var findHp = function (obj, a, d) {
  let value = CovertToString(a);
  for(key in obj)
  {
    if(key === value)
    {
      for(k in obj[key])
      {
        if(k === d)
        {
          console.log(obj[key][k]);
          test(obj[key][k]);
        }
        

      }
    }
  }
};

const test = (obj) => {

let test = (66 + 11) * obj;
console.log(test, " Test");
  return test;
}

const motorHpList = [3, 5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60];

const SetHp = () =>
{
  const calculatedHp = 24.642;
  console.log(calculatedHp, "FindHp");
  let hp;
  const aboveNine = 9;
  const belowSevenPointFive = 7.5;
  let matchingStandardHp = parseInt(FindMatch(calculatedHp));
  for(let i = matchingStandardHp; i < motorHpList.length; i++)
    {
	  if(calculatedHp > aboveNine && ((motorHpList[i] - calculatedHp) <= 1))
    {
      hp = motorHpList[i + 1];
      console.log("This is the final result: ", hp);
      return hp;
    }
	   	
	  else if(calculatedHp < belowSevenPointFive && ((motorHpList[i] - calculatedHp) <= 0.5))
    {
      hp = motorHpList[i + 1];
      console.log("This is the final result: ", hp);
      return hp;
    }
	   
    else
    {
      hp = motorHpList[i];
      console.log("This is the final result: ", hp);
      return hp;
    }
      
    }
	 
    //console.log("This is the final result: ", hp);
  return hp;
}

const FindMatch = calculatedHp => {
for(let hp in motorHpList)
  if(calculatedHp <= motorHpList[hp])
    return hp;
 
  return 0;
}

function CovertToString(angle)
{
  let convertToString
  switch(angle)
  {
    case "0_5":
    convertToString = "one";
    break;
    case "10_15":
    convertToString = "two";
    break;
    case "20_30":
    convertToString = "three";
    break;
    case "35_45":
    convertToString = "four";
    break;
    case "50_60":
    convertToString = "five";
    break;
  }

  return convertToString;
}

 findHp(doubleRunPowerRequired, "0_5", "six");
 //SetHp();
//FindMatch(4.26);

var doubleRunPowerRequired = {
  zero_five: {
    six: 0.042,
    eight: 0.076,
    ten: 0.114,
    twelve: 0.18
  },

  ten_fifteen: {
    six: 0.062,
    eight: 0.113,
    ten: 0.17,
    twelve: 0.18,
  },

  twenty_thirty:
  {
    six: 0.085,
    eight: 0.167,
    ten: 0.25,
    twelve: 0.397
  },

  thirtyfive_fortyfive: {
    six: 0.12,
    eight: 0.222,
    ten: 0.333,
    twelve: 0.524
  },

  fifty_sixty: {
    six: 0.15,
    eight: 0.27,
    ten: 0.405,
    twelve: 0.629
  },
};

const motorHpList = [3, 5, 7.5, 10, 15, 20, 25, 30, 40, 50, 60];

const FindHp = () => {
  let hp;
  const aboveNine = 9;
  const belowSevenPointFive = 7.5;
  const calculatedHp = SetCalculatedHp();
  let matchingStandardHp = parseInt(FindMatchingHp(calculatedHp));
  for (let i = matchingStandardHp; i < motorHpList.length; i++) {
    if (calculatedHp > aboveNine && ((motorHpList[i] - calculatedHp) <= 1)) {
      hp = motorHpList[i + 1];
      return hp;
    }

    else if (calculatedHp < belowSevenPointFive && ((motorHpList[i] - calculatedHp) <= 0.5)) {
      hp = motorHpList[i + 1];
      return hp;
    }

    else {
      hp = motorHpList[i];
      return hp;
    }

  }

  return hp;
}

function SetHp() {
  document.getElementById('requiredHp').innerHTML = FindHp();
}

const FindMatchingHp = calculatedHp => {
  for (let hp in motorHpList)
    if (calculatedHp <= motorHpList[hp])
      return hp;

  return 0;
}

const FindCoefficient = (obj, inclineAngle, capacity) => {
  const angle = CovertToString(inclineAngle);
  for (let item in obj) {
    if (item === angle) {
      for (let key in obj[item])
        if (key === capacity)
          return obj[item][key];
    }
  }

  return 0;
};


const SetCalculatedHp = () => {
  const straightConveyorLength = parseInt(document.getElementById('straightConveyorLength').value);
  const futureExpansionLength = parseInt(document.getElementById('futureExpansionAdditionalLength').value);
  const capacity = document.getElementById('capacitySelection').value;
  const straightConveyorInclineAngle = document.getElementById('straightConveyorInclineAngle').value;
  const commodityMultiplier = Number(document.getElementById('commoditySelection').value);
  const coefficient = FindCoefficient(doubleRunPowerRequired, straightConveyorInclineAngle, capacity);

  document.getElementById('tooltipForStraightConveyorLength').innerText = straightConveyorLength;
  document.getElementById('tooltipForFutureExpansionLength').innerText = futureExpansionLength;
  document.getElementById('tooltipForCoefficient').innerText = coefficient;
  document.getElementById('tooltipForCommodityMultiplier').innerText = commodityMultiplier;

  const horizontalComponent = ((straightConveyorLength + futureExpansionLength)
    * coefficient) * commodityMultiplier;
  document.getElementById('commodity').innerHTML = commodityMultiplier;
  document.getElementById('coefficient').innerHTML = coefficient;
  document.getElementById('standardHp').innerHTML = horizontalComponent;
  HighlightCoefficient(coefficient);

  return horizontalComponent;
}

const HighlightCoefficient = coefficient => {
  let hpTable = document.getElementById('hpTable').getElementsByTagName('tr');
  for (let i = 0; i < hpTable.length; i++) {
    let tr = hpTable.item(i);
    var tds = tr.getElementsByTagName('td');
    for (let j = 0; j < tds.length; j++) {
      var td = tds[j].innerHTML;
      if (td == coefficient)
        tds[j].style.backgroundColor = "#00AA00";
      else
        tds[j].style.backgroundColor = '';
    }
  }

}

const CovertToString = angle => {
  let convertToString;
  switch (angle) {
    case "0_5":
      convertToString = "zero_five";
      break;
    case "10_15":
      convertToString = "ten_fifteen";
      break;
    case "20_30":
      convertToString = "twenty_thirty";
      break;
    case "35_45":
      convertToString = "thirtyfive_fortyfive";
      break;
    case "50_60":
      convertToString = "fifty_sixty";
      break;
  }

  return convertToString;
}

const PopulateStraightConveyorLength = () => {
  let select = document.getElementById("straightConveyorLength");
  let counter = 20;
  let start = 11;

  while (counter > 0) {
    let length = document.createElement('option');
    length.innerHTML = start + " ft";
    length.value = start;
    select.appendChild(length);
    start += 5;
    counter--;
  }
}

const PopulateFutureExpansionAdditionalLength = () => {
  let select = document.getElementById("futureExpansionAdditionalLength");
  let counter = 20;
  let start = 0;

  while (counter > 0) {
    let length = document.createElement('option');
    length.innerHTML = start + " ft";
    length.value = start;
    select.appendChild(length);
    start += 5;
    counter--;
  }
}

const PopTooltip = () => {
  $('#tooltipForStraightConveyorLength').tooltip({ title: "Straight Conveyor Length", placement: "bottom" });
  $('#tooltipForFutureExpansionLength').tooltip({ title: "Future Expansion Additional Length", placement: "bottom" });
  $('#tooltipForCoefficient').tooltip({ title: "Coefficient", placement: "bottom" });
  $('#tooltipForCommodityMultiplier').tooltip({ title: "Commodity Multiplier", placement: "bottom" });
}

PopulateStraightConveyorLength();
PopulateFutureExpansionAdditionalLength();
SetCalculatedHp();
SetHp();
PopTooltip();


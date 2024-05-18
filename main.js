let item =
{
  count: 0,
  cost: 1,
  increase: 2,
  hcps: 3,
  baseHcps: 4
};

let holoCoin = 0;
let hcps = 0;

/* idx info
  0: アイテムの購入数
  1: アイテムのコスト
  2: アイテムの増加率
  3: アイテムの生産性
  4: アイテムのベース生産性
*/
let cursor = [0, 15, 1.3, 0, 1];
let listener = [0, 200, 1.4, 0, 5];
let company = [0, 1000, 1.5, 0, 10];
let bank = [0, 10000, 1.5, 0, 100];

const Debug = document.querySelector("#IMG_Debug");
const HoloCoin = document.querySelector("#IMG_HoloCoin");
const Cursor = document.querySelector("#IMG_Cursor");
const Listener = document.querySelector("#IMG_Listener");
const Company = document.querySelector("#IMG_Company");
const Bank = document.querySelector("#IMG_Bank");

Debug.addEventListener("click", () =>
{
  holoCoin += 1000000;
  AudioPlay("AUDIO_SelectItem");
});

HoloCoin.addEventListener("click", () =>
{
  holoCoin++;
  AudioPlay("AUDIO_HoloCoin");
});

Cursor.addEventListener("click", () =>
{
  BuyItem(cursor);
});

Listener.addEventListener("click", () =>
{
  BuyItem(listener);
});

Company.addEventListener("click", () =>
{
  BuyItem(company);
});

Bank.addEventListener("click", () =>
{
  BuyItem(bank);
});

function BuyItem(self)
{
  if (holoCoin < self[item.cost])
  {
    AudioPlay("AUDIO_NoSelectItem");
    return;
  }
  AudioPlay("AUDIO_SelectItem");
  self[item.count] += 1;
  holoCoin -= self[item.cost];
  self[item.cost] = CostUp(self);
  self[item.hcps] = self[item.count] * self[item.baseHcps];
  HcpsCalc();
  return;
}

function HcpsCalc()
{
  let hcpsBuf = 0;
  hcpsBuf += cursor[item.hcps];
  hcpsBuf += listener[item.hcps];
  hcpsBuf += company[item.hcps];
  hcpsBuf += bank[item.hcps]
  hcps = hcpsBuf;
  return;
}

function CostUp(self)
{
  let res;
  res = Math.floor(self[item.cost] * self[item.increase]);
  return res;
}

function AudioPlay(id)
{
  document.getElementById(id).currentTime = 0;
  document.getElementById(id).play();
  return;
}

function GameLoop()
{
  holoCoin += hcps;
  return;
}

function DisplayLoop()
{
  // holo coin
  document.getElementById("TEXT_HoloCoin").innerText = holoCoin;
  document.getElementById("TEXT_Hcps").innerText = hcps;
  // cursor
  document.getElementById("TEXT_Cursor").innerText = cursor[item.count];
  document.getElementById("COST_Cursor").innerText = cursor[item.cost];
  document.getElementById("HCPS_Cursor").innerText = cursor[item.hcps];
  document.getElementById("BHCPS_Cursor").innerText = cursor[item.baseHcps];
  // listener
  document.getElementById("TEXT_Listener").innerText = listener[item.count];
  document.getElementById("COST_Listener").innerText = listener[item.cost];
  document.getElementById("HCPS_Listener").innerText = listener[item.hcps];
  document.getElementById("BHCPS_Listener").innerText = listener[item.baseHcps];
  // company
  document.getElementById("TEXT_Company").innerText = company[item.count];
  document.getElementById("COST_Company").innerText = company[item.cost];
  document.getElementById("HCPS_Company").innerText = company[item.hcps];
  document.getElementById("BHCPS_Company").innerText = company[item.baseHcps];
  // bank
  document.getElementById("TEXT_Bank").innerText = bank[item.count];
  document.getElementById("COST_Bank").innerText = bank[item.cost];
  document.getElementById("HCPS_Bank").innerText = bank[item.hcps];
  document.getElementById("BHCPS_Bank").innerText = bank[item.baseHcps];
  return;
}

window.setInterval(GameLoop, 1000);
window.setInterval(DisplayLoop, 100);

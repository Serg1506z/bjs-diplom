

let logout = new LogoutButton();
logout.action = () => {
  ApiConnector.logout((answer) => {
    if (answer.success) {
      location.reload();
    }
  });
};

ApiConnector.current((answer) => {
  if (answer.success) {
    ProfileWidget.showProfile(answer.data);
  }
});


let rb = new RatesBoard();
function getStocks(){
  ApiConnector.getStocks((answer) =>{
    if (answer.success) {
      rb.clearTable()
      rb.fillTable(answer.data)
    }
    })
}
getStocks()
setInterval(getStocks,60000)

let mm = new MoneyManager();
mm.addMoneyCallback = (data) =>{
  ApiConnector.addMoney(data,(answer) => {
    if (answer.success){
      ProfileWidget.showProfile(answer.data)
      mm.setMessage(true,"Пополнения прошло успешно")
    }
    else{
      mm.setMessage(false,answer.error)
    }
  })
}

mm.conversionMoneyCallback = (data) =>{
  ApiConnector.convertMoney(data,(answer) =>{
    if (answer.success){
      ProfileWidget.showProfile(answer.data)
      mm.setMessage(true,"Конвертирование прошло успешно")
    }
    else{
      mm.setMessage(false,answer.error)
    }
  })
}

mm.sendMoneyCallback = (data) =>{
  ApiConnector.transferMoney(data,(answer) =>{
    if (answer.success){
      ProfileWidget.showProfile(answer.data)
      mm.setMessage(true,"Перевод прошел успешно")
    }
    else{
      mm.setMessage(false,answer.error)
    }
  })
}

let fw = new FavoritesWidget();
ApiConnector.getFavorites((answer) => {
if (answer.success){
  fw.clearTable();
  fw.fillTable(answer.data);
  mm.updateUsersList(answer.data)
}
})


fw.addUserCallback = (data) =>{
  ApiConnector.addUserToFavorites(data,(answer) => {
    if (answer.success){
      fw.clearTable();
      fw.fillTable(answer.data);
      mm.updateUsersList(answer.data)
      fw.setMessage(true,"Добавление прошло успешно")
    }
    else{
       fw.setMessage(false,answer.error)}
  })
}

fw.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data,(answer) => {
    if (answer.success){
      fw.clearTable();
      fw.fillTable(answer.data);
      mm.updateUsersList(answer.data)
      fw.setMessage(true,"Удаление прошло успешно")
    }
    else{
       fw.setMessage(false,answer.error)}
  })
}
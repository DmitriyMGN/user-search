export default class Api {
  constructor() {
    this._url = "http://127.0.0.1:3000"
    this._headers = {
      'Content-Type': 'application/json'
    }
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }


  getUsersInfo() {
    return fetch(this._url, {
      headers: this._headers
    })
      .then(this._checkResponse);
  } 

  getSearchUsers(inputValue) {
    return fetch(`${this._url}/?term=${inputValue}`, {
      headers: this._headers
    })
      .then(this._checkResponse);
  } 

}




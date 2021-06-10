
//инпуты страницы входа
export function loginInputFromLoginPageAction(loginFromInput) {
  return {
    type: "CHANGE_INPUT_LOGIN",
    payload: {
      loginFromInput
    }
  }
}


export function passwInputFromLoginPageAction(passFromInput) {
  return {
    type: "CHANGE_INPUT_PASS",
    payload: {
      passFromInput
    }
  }
}


//инпуты страницы админа
//добавление
export function loginInputFromAdminPageAddAction(loginFromInputAdd) {
  return {
    type: "CHANGE_INPUT_LOGIN_ADMIN_ADD",
    payload: {
      loginFromInputAdd
    }
  }
}


export function passwInputFromAdminPageAddAction(passFromInputAdd) {
  return {
    type: "CHANGE_INPUT_PASS_ADMIN_ADD",
    payload: {
      passFromInputAdd
    }
  }
}

//удаление
export function loginInputFromAdminPageDeleteAction(loginFromInputDelete) {
  return {
    type: "CHANGE_INPUT_LOGIN_ADMIN_DELETE",
    payload: {
      loginFromInputDelete
    }
  }
}


export function passwInputFromAdminPageDeleteAction(passFromInputDelete) {
  return {
    type: "CHANGE_INPUT_PASS_ADMIN_DELETE",
    payload: {
      passFromInputDelete
    }
  }
}

export function takeArrOfSotsAction(arrOfSorts) {
  return {
    type: "TAKE_ARR_OF_SORTS_FROM_BACK",
    payload: {
      arrOfSorts
    }
  }
}

export function takeRowsForAntDAction(rows) {
  return {
    type: "ROWS",
    payload: {
      rows
    }
  }
}


export function takeColumnsForAntDAction(columns) {
  return {
    type: "COLUMNS",
    payload: {
      columns
    }
  }
}


export function selectedSortsAntdAction(e, el) {
  return {
    type: "SELECTED_SORT",
    payload: {
      el: el,
      e: e,
    }
  }
}

export function selectedSortsAntdSectorAction(e, el) {
  return {
    type: "SELECTED_SORT_SECTOR",
    payload: {
      e: e,
      el: el,
    }
  }
}


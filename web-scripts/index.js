(function() {
  let activeVisaCenterIndex = 3
  let canReset = true
  let shoudlRefresh = false

  function startCheckingAppointment() {
    try {
      const selectList = document.getElementsByTagName('mat-select')
      const visaCenterSelect = selectList[0]
      const visaCategorySelect = selectList[1]
      const visaSubCategorySelect = selectList[2]

      canReset = false

      if (activeVisaCenterIndex === 7) {
        activeVisaCenterIndex = 3
        canReset = true
        autoLogout()
        return;
      }

      if (visaCenterSelect) {
        // select visa center
        visaCenterSelect.click()
        const visaCenterList = document.getElementsByTagName('mat-option')
        const currentVisaCenter = visaCenterList[activeVisaCenterIndex]
        activeVisaCenterIndex++
        currentVisaCenter.click()

        let visaSubCategory = ""
        let visaCategory = ""

        setTimeout(() => {
          // select visa category
          visaCategorySelect.click()
          const visaCategoryList = document.getElementsByTagName('mat-option')
          visaCategory = visaCategoryList.length > 1 ? visaCategoryList[2] : visaCategoryList[0]
          visaCategory.click()
        }, 10000)

        setTimeout(() => {
          // select visa sub category
          visaSubCategorySelect.click()
          const visaSubCategoryList = document.getElementsByTagName('mat-option')
          const visaSubCategoryArr = Array.from(visaSubCategoryList)
          visaSubCategory = visaSubCategoryArr.find(visaSubCategorty => visaSubCategorty.innerText.includes('Work Permit'))
          visaSubCategory.click()
        }, 20000)

        setTimeout(() => {
            // // check if any appointments are available
            const HTMLElm = document.getElementsByTagName('html')[0]
            let alarmTimerId = 0

            const continueBtn = document.getElementsByClassName("mat-focus-indicator btn mat-btn-lg btn-block btn-brand-orange mat-raised-button mat-button-base mat-button-disabled")[0]

            if (location.href.includes("tur/en/pol/application-detail") && !HTMLElm.innerText.includes('No appointment slots are currently available') && !continueBtn) {
              const audio = new Audio("https://notificationsounds.com/storage/sounds/file-sounds-1158-lovingly.mp3")
              audio.play()
              // alarmTimerId = setInterval(() => {
              // }, 70000)

              const qs = `${encodeURIComponent(currentVisaCenter.innerText)};${encodeURIComponent(visaCategory.innerText)};${encodeURIComponent(visaSubCategory.innerText)}`
              fetch("http://127.0.0.1:3003/?text=" + qs, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then((data) => console.log(data)).catch(err=>console.log(err))
            } else {
              clearInterval(alarmTimerId)
            }

            canReset = true
          }, 30000)
      }
    } catch (error) {
      fetch("http://127.0.0.1:3003/?text=ERRORRRRR!!!!", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((data) => console.log(data)).catch(err=>console.log(err))
    }
  }

  function autoLogin() {
    let loginbtn = document.getElementsByClassName("mat-focus-indicator btn")[0]
    // document.getElementsByTagName("mat-form-field")[0].focus()
    // document.getElementsByTagName("mat-form-field")[1].focus()
    document.getElementsByTagName("body")[0].click()
    setTimeout(() => loginbtn.click(), 0)
  }

  function startNewBooking() {
    let newBookingBtn = document.getElementsByClassName("btn mat-raised-button mat-button-base")
    newBookingBtn[0].click()
  }

  function autoLogout() {
    let logoutBtn = document.getElementsByClassName("dropdown-item bg-brand-orange")
    logoutBtn[0].click()
  }

  setInterval(() => {
    const locationHref = location.href

    if (locationHref.includes("tur/en/pol/login")) {
      autoLogin()
    } else if (locationHref.includes("tur/en/pol/dashboard")) {
      startNewBooking()
    } else if (locationHref.includes("tur/en/pol/application-detail")) {
      if (canReset) {
        // const buttonList = document.getElementsByClassName("mat-raised-button")
        // const buttonArray = Array.from(buttonList)
        // const stayConnectedButton = buttonArray.find(btn => btn.innerHTML.includes("Stay Connected"))
        
        // if (stayConnectedButton) {
        //   stayConnectedButton.click()
        // }

        startCheckingAppointment()
      }
    } else {
      if (shoudlRefresh) {
        location.href = "https://visa.vfsglobal.com/tur/en/pol/login"
        return
      }

      shoudlRefresh = true

      const qs = `${encodeURIComponent("ERROR! UNKNOWN PAGE DETECTED!")}`
      fetch("http://127.0.0.1:3003/?text=" + qs, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((data) => console.log(data)).catch(err=>console.log(err))
    }
  }, 30000)
})();
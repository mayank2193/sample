import {updateSessionById} from "./lib/apiClient"
const supportedHelpers = [
  'WebDriver',
  'Appium',
];


class LambdaTestHelper extends Helper{

  _init(){
    this.updateTestName = this.config.updateTestName

    if (!this.config.user || !this.config.key) throw new Error('Please provide proper Lambdatest credentials')
    this.lambdatestCredentials = {
      username: this.config.user,
      accessKey: this.config.key,
      isApp: this.isApp || false
    }
  }

  getSessionId (helper, isApp) {
    try {
      if ( !isApp && helper.WebDriver) {
        return helper.WebDriver.browser.sessionId;
      }
      if (helper.helpers.Appium) {
          return helper.helpers.Appium.browser.sessionId;
      }

    } catch(err){
      console.log("Error - ", err)
    }
    
    throw new Error(`No matching helper found. Supported helpers: ${supportedHelpers.join('/')}`);
}

  getBody(testTitle, status){
    let body = {}
    if (this.updateTestName) body.name = testTitle    
    body.status_ind = status

    return body
  }

  async updateJob(sessionId, body, lambdaCredentials) {
    const sleep = ms => new Promise(r => setTimeout(r, ms));    
    await sleep(2000)
    try{
        await updateSessionById(sessionId, body, lambdaCredentials)
    }catch (err){
        console.log("Update api call error- ", err)

    }
    
  }

 
  _failed(test){
    console.log("Test Failed", test.title)
    
    var sessionId = this.getSessionId(this.helpers,this.lambdatestCredentials.isApp)
    console.log("Test ID", sessionId)   

    if (sessionId && test.title){
      var body = this.getBody(test.title, "failed")
      this.updateJob(sessionId, body, this.lambdatestCredentials)
    }


  }

  _passed(test){
    console.log("Test Passed", test.title)
    var sessionId = this.getSessionId(this.helpers,this.lambdatestCredentials.isApp)
    console.log("Test ID", sessionId)   

    if (sessionId && test.title){
      var body = this.getBody(test.title, "passed")
      this.updateJob(sessionId, body, this.lambdatestCredentials)
    }


  }


}
module.exports =  LambdaTestHelper
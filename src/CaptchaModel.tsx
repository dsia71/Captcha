import * as React from 'react';
// @ts-ignore
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { FCMCore } from 'fcmlib/lib/FCMCore';
import { FlowOutcome } from 'fcmlib/lib/FlowOutcome';

export class CaptchaModel extends React.Component<any, any> {

    onAccept: FlowOutcome;

    constructor(props: any) {
        super(props);
        this.acceptResult = this.acceptResult.bind(this);
        let parent: FCMCore = this.props.parent;    
        
        if(parent.getAttribute("onAccept")){
            this.onAccept = parent.outcomes[parent.getAttribute("onAccept")];            
        }
    }

    async componentDidMount() {              
      loadCaptchaEnginge(6, 'black', 'white');      
    }

    async acceptResult() {
        let parent: FCMCore = this.props.parent;
              
        if (this.onAccept) {
            parent.triggerOutcome(this.onAccept.developerName);            
        }
    }
    
    doSubmit = () => {
        let user_captcha = (document.getElementById('user_captcha_input') as HTMLInputElement).value;
        
        if (validateCaptcha(user_captcha)===true) {            
            loadCaptchaEnginge(6, 'black', 'white');
            (document.getElementById('captcha_message') as HTMLLabelElement).innerText = "Captcha matched";
            (document.getElementById('user_captcha_input') as HTMLInputElement).value = "";
            
            {this.acceptResult()}
        } else {            
            loadCaptchaEnginge(6, 'black', 'white');
            (document.getElementById('captcha_message') as HTMLLabelElement).innerText = "Captcha does not match";
            (document.getElementById('user_captcha_input') as HTMLInputElement).value = "";
        }
    };

    myFunction = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter")
        {
            alert("To submit, please click submit button.");            
        }    
    }

    render() {
        let control: any;
       
        return (<div>
           <LoadCanvasTemplate />
           <div className="field padding-bottom--24">
            <input
                    type="text"
                    id="user_captcha_input"
                    name="user_captcha_input"
                    defaultValue=""
                    onKeyDown={this.myFunction}
                    placeholder="Enter Captcha Value"
                    className="input"
                    size={25}
                    maxLength={6}
                />     
            </div>
          
           <div className="field padding-bottom--24">
                <button className="outcome btn btn-primary" onClick={() => this.doSubmit()}>Submit</button>
           </div>
                   
            <div>        
                <label id="captcha_message" />
            </div>
                  
        </div>);
    };
}
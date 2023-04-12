import React, { useState, useEffect } from "react";
import { CometChatConversationListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src";
import {useParams} from "react-router-dom";

export const Chat = () => {
    const { email } = useParams();
    if(email === undefined){
        return (
            <div>
                <CometChatConversationListWithMessages  />
            </div>
        )
    }else{
        return (
            <div >
                <CometChatConversationListWithMessages  chatWithUser={email.replace("@vanderbilt.edu", "").replaceAll(".", "_")}/>
            </div>
        )
    }
}
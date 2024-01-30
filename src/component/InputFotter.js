import React, { useContext, useState } from 'react';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OpenAI from 'openai';
import { Badge } from 'react-bootstrap';
import Spin from './Spin';
import { UserContext } from '../pages/Layout';
import { maincontext } from './Main';

const InputFooter = () => {
  let { senddatafromchild, newchat, jwt } = useContext(UserContext)
  let { message, setMessage, clickdefault, setclickdefault } = useContext(maincontext)
  const [sendHover, setSendHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleAssistant = async () => {
    if (!message || loading) {
      return;
    }

    setLoading(true);
    const apiKey = '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';
    const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: message }],
        model: 'gpt-3.5-turbo',
      });
      let choice = completion.choices[0];
      if (jwt) {
        if (completion.choices.length > 0) {
          if (newchat === true) {
            let chatName = message + " " + choice.message.content;
            let str = chatName.split(" ").filter((element, i) => i < 4);
            let newstr = new String(str);
            newstr = newstr.replaceAll(",", " ");
            senddatafromchild(choice, message, true, newstr);
            setclickdefault(false)

          } else {
            senddatafromchild(choice, message, true);
            setclickdefault(false)
          }
        }
      }
      if (!jwt) {
        senddatafromchild(choice, message, true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleClick = () => {
    handleAssistant();
  };
  if (clickdefault === true) {
    if (loading === false) {
      handleAssistant()
    }
  }

  return (
    <div className={`v-input mb-4  p-0 w-50 ms-auto   v-border d-flex justify-content-between rounded-4 p-2 text-white fixed-bottom bg-secondary`}>
      <textarea
        className="d-inline w-100 text-white bg-secondary"
        placeholder="Enter your message"
        onChange={(event) => setMessage(event.target.value)}
        value={message}
        rows={1}
      />
      <div
        type="button"
        className={` d-flex  ${loading ? "" : "v-send v-border"} ${!message ? 'lightgray' : ''} justify-content-center align-items-center`}
        onClick={() => {
          if (!loading) {
            handleClick();
          }
        }}
        onMouseEnter={() => setSendHover(true)}
        onMouseLeave={() => setSendHover(false)}
      >
        {sendHover && (
          <Badge bg="danger" className="position-absolute v-sendhover d-inline ">
            <p>send{loading ? "ing" : ""} message</p>
          </Badge>
        )}
        {loading && <Spin />}
        {!loading && <FontAwesomeIcon icon={faArrowUp} className="m-auto v-sendbtn" size="lg" />}
      </div>
    </div>
  );
};

export default InputFooter;

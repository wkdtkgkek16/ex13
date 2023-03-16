import React, { useContext, useEffect, useRef, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import './Chat.css'
import { UserContext } from './UserContext'
import { app } from '../firebase'
import { getDatabase, ref, set, push, onValue, remove } from 'firebase/database'
import moment from 'moment'
import { async } from '@firebase/util'

const ChatPage = () => {
    const db = getDatabase(app)
    const {user} = useContext(UserContext);
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const ref_bottem = useRef(null)
    const getMessage = () => {
        setLoading(true);
        onValue(ref(db,'chat'),(result)=>{
            let rows=[];
            result.forEach(row=>{
                rows.push(row.val());
            })
            // console.log(rows);
            setMessages(rows);
            setLoading(false);
        })
    }

    useEffect(()=>{
        getMessage();
    },[]);

    const onSend = async(e) => {
        e.preventDefault();
        if(text===""){
            alert("전송할 내용을 입력하세요");
            return;
        }
        //메세지 전송
        const key = push(ref(db, 'chat')).key;
        const message={
            key:key,
            email:user.email,
            name:user.name,
            photo:user.photo,
            text:text,
            date:moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
        }
        await set(ref(db,`chat/${key}`),message);
        setText('');
        ref_bottem.current.scrollIntoView({behavior:'smooth'});

    }

    const onDelete = (e) => {
        e.preventDefault();
        const key=e.target.getAttribute('href')
        if(!window.confirm(`${key} 메세지를 삭제합니까?`)) return;
        remove(ref(db,`chat/${key}`));
    }


    return (
      <Row className='justify-content-center mt-2'>
        <Col xl={5}>
          <Card>
            <Card.Title className='text-center mt-2'>
              <h4>채팅룸</h4>
            </Card.Title>
            <Card.Body>
              <div className='wrap'>
                {messages.map(msg=>
                    <div key = {msg.key} className={user.email===msg.email ? 'chat ch2' : 'chat ch1'}>
                        {msg.email !== user.email &&
                        <div className='icon'>
                            <img src={msg.photo}/>
                            <div className='sender'>
                                {msg.name}
                                </div>
                        </div>
                        }
                        <div className='textbox'>
                            {msg.text}
                            {msg.email === user.email &&
                                <a href={msg.key} onClick={onDelete} className="delete">x</a>
                            }
                            <br/>
                            {msg.date}
                        </div>
                    </div>
                )}
                <div ref={ref_bottem}/>
              </div>
              <Form onSubmit={onSend}>
                <Form.Control 
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder='💬 메세지 입력...'/>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    )
}

export default ChatPage
import React, { useContext, useEffect, useState } from 'react'
import { maincontext } from './Main';

export default function DefaultMessege() {
    const [randomQuotes, setRandomQuotes] = useState([]);
    let { message, setMessage, setclickdefault, clickdefault } = useContext(maincontext)
    const quotes = [
        {
            header: "Help me pick",
            paragraph: "a gift for my dad who loves fishing"
        },
        {
            header: "Plan an itinerary",
            paragraph: "to experience the wildlife in the Australian outback"
        },
        {
            header: "Create a workout plan",
            paragraph: "for resistance training"
        },
        {
            header: "Come up with concepts",
            paragraph: "for a retro-style arcade game"
        },
        {
            header: "Write an email",
            paragraph: "to request a quote from local plumbers"
        },
        {
            header: "Write an email",
            paragraph: "to request a quote from local plumbers"
        },
        {
            header: "Show me a code snippet",
            paragraph: "of a website's sticky header"
        },
        {
            header: "Plan a trip",
            paragraph: "to see the northern lights in Norway"
        },
        {
            header: "Compare design principles",
            paragraph: "for mobile apps and desktop software"
        },
        {
            header: "Create a content calender",
            paragraph: "for a TikTok account"
        },
        {
            header: "Design a database schema",
            paragraph: "for an online merch store"
        },
        {
            header: "Create a charter",
            paragraph: "to start a film club"
        },
        {
            header: "Recommend a dish",
            paragraph: "to bring to a potluck"
        },
        {
            header: "Make a content strategy",
            paragraph: "for a newsletter featuring free local weekend events"
        },
        {
            header: "Give me ideas",
            paragraph: "for what to do with my kids' art"
        },
        {
            header: "Suggest fun activities",
            paragraph: "for a family of 4 to do indoors on a rainy day"
        },
        {
            header: "Compare business strategies",
            paragraph: "for transitioning from budget to luxury vs. luxury to budget"
        }
    ];
    useEffect(() => {
        const shuffledQuotes = [...quotes].sort(() => Math.random() - 0.5);
        const selectedQuotes = shuffledQuotes.slice(0, 4);
        setRandomQuotes(selectedQuotes);
    }, []);
    return (
        <div className='d-flex flex-wrap justify-content-evenly  w-100 '>
            {
                randomQuotes.map((quote, index) => (
                    <div key={index} className={`cursor-pointer white-border ms-1 ${index < 2 ? "" : "d-none"} d-lg-block v-randomcomp m-0 pt-2 ps-1 rounded-5 col-${index}  mt-3`} onClick={() => {
                        if (!clickdefault) {
                            setclickdefault(true)
                        }
                        let click=document.querySelector(`.col-${index}`)
                        setMessage(click.children[0].innerHTML+" "+click.children[1].innerHTML)
                    }}>
                        <h6 className={`text-white default-head fw-bold default-body fs-6`}>{quote.header}</h6>
                        <p >{quote.paragraph}</p>
                    </div>
                ))
            }
        </div>
    )
}

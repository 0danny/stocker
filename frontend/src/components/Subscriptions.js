import Filter3Icon from "@mui/icons-material/Filter3"
import Filter2Icon from "@mui/icons-material/Filter2"
import Filter1Icon from "@mui/icons-material/Filter1"
import Log from "./Logger"

import { FormControlLabel, Radio } from "@mui/material"

//Store the ID of the current users membership, so that it can be set
let membershipID = 0

export const setMembershipId = (id) => {
    membershipID = id

    Log("Set membership ID to " + id, "Subscriptions")
}

export const getFrequencies = () => {
    //Make form control labels depending on the membership ID

    return (
        <>
            {getMemberById(membershipID).frequencies.map((frequency) => {
                const key = Object.keys(frequency)[0]
                const value = Object.values(frequency)[0]

                return <FormControlLabel key={key} value={key} control={<Radio />} label={value} />
            })}
        </>
    )
}

export const membershipItems = [
    {
        id: 100,
        name: "Explorer",
        price: "$5 USD",
        features: [
            "Stock checks on up to 5 websites.",
            "Check frequency: Every hour.",
            "Email notifications for stock updates.",
            "Unlimited access to Stocker marketplace.",
        ],
        frequencies: [{ daily: "Daily" }, { hourly: "Hourly" }],
        icon: <Filter3Icon color="primary" />,
    },
    {
        id: 200,
        name: "Enthusiast",
        price: "$10 USD",
        features: [
            "Stock checks on up to 15 websites.",
            "Check frequency: Every 30 minutes.",
            "Email and SMS notifications for stock updates.",
            "Unlimited access to Stocker marketplace.",
            "Priority customer support.",
        ],
        frequencies: [{ daily: "Daily" }, { hourly: "Hourly" }, { every30: "30 Minutes" }],
        icon: <Filter2Icon color="secondary" />,
    },
    {
        id: 300,
        name: "Professional",
        price: "$15 USD",
        features: [
            "Stock checks on up to 25 websites.",
            "Check frequency: Every 15 minutes.",
            "Email and SMS notifications for stock updates.",
            "Unlimited access to Stocker marketplace.",
            "Priority customer support.",
        ],
        frequencies: [
            { daily: "Daily" },
            { hourly: "Hourly" },
            { every30: "30 Minutes" },
            { every15: "15 Minutes" },
        ],
        icon: <Filter1Icon color="success" />,
    },
]

export const getMemberById = (id) => {
    return membershipItems.find((member) => member.id == id)
}

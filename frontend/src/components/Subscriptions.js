import Filter3Icon from "@mui/icons-material/Filter3"
import Filter2Icon from "@mui/icons-material/Filter2"
import Filter1Icon from "@mui/icons-material/Filter1"

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
        icon: <Filter1Icon color="success" />,
    },
]

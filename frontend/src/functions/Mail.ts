import emailjs from "@emailjs/browser";

emailjs.init("9_kBIJXhgaXwl3gHX")
export async function sendPurchaseMail({name, email, totalPrice}: {name: string, email: string, totalPrice: number}){ {
    try {
        await emailjs.send(
            'service_hb46s7f',
            'template_ee0z90o',
            {
                to_name: name,
                to_email: email,
                from_name: "CRM Company",
                message: `Thanks for your purchase! 
                You have made a purchase of ₹ ${totalPrice}.`
            },
            '9_kBIJXhgaXwl3gHX'
        )
        console.log("email sent")
    } catch (error) {
        console.log("error", error)
    }

}}
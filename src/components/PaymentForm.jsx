import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

function PaymentForm({ clientSecret, closeModal }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const handleSubmit = async (event) => {
    event.preventDefault()
    setErrorMessage("")
    if (!stripe || !elements) {
      return
    }
    try {
      setIsProcessing(true)
      const { error: submitError } = await elements.submit()
      if (submitError) {
        setErrorMessage(submitError.message || "Something went wrong")
        return
      }
      const { error, paymentIntent } = await stripe?.confirmPayment({
        elements,
        clientSecret,
        redirect: "if_required",
      })
      if (error) {
        console.error("Error while confirming payment", error)
        setErrorMessage(error.message || "Something went wrong")
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        closeModal()
        toast.success("Payment processed sucessfully")
      }
    } catch (error) {
      console.error(error)
      toast.error("COuld not create payment intent")
    } finally {
      setIsProcessing(false)
    }
  }
  return (
    <div
      className="fixed w-full inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-100 animate-in fade-in duration-200"
      onClick={closeModal}
    >
      <div
        className="bg-white w-11/12 max-w-[520px] relative rounded-3xl py-3 overflow-y-auto max-h-[570px] overflow-x-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4">
          <X />
        </button>
        <form onSubmit={handleSubmit} className="w-full">
          <PaymentElement />
          <button
            disabled={!stripe || !elements || isProcessing}
            className="mx-auto mt-5 flex w-max items-center justify-center rounded-full bg-primary px-10 py-2 font-satoshiBold font-bold text-[#EBE9F4] disabled:opacity-55"
            type="submit"
          >
            {isProcessing ? "Processing..." : "Submit"}
          </button>
          {errorMessage && (
            <p className="w-full text-sm font-medium text-red-500">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  )
}

export default PaymentForm

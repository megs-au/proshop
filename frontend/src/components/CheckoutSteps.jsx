import { TabItem, Tabs } from "flowbite-react"
import { Link } from "react-router-dom"

const StepTitle = ({ enabled, to, children }) =>
    enabled ? (
        <Link to={to}>{children}</Link>
    ) : (
        <span className="cursor-not-allowed opacity-60">{children}</span>
    )

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Tabs className="justify-center mb-4">
        <TabItem title={<StepTitle enabled={step1} to='/login'>Sign In</StepTitle>} active={step1} disabled={!step1} />
        <TabItem title={<StepTitle enabled={step2} to='/shipping'>Shipping</StepTitle>} active={step2} disabled={!step2} />
        <TabItem title={<StepTitle enabled={step3} to='/payment'>Payment</StepTitle>} active={step3} disabled={!step3} />
        <TabItem title={<StepTitle enabled={step4} to='/placeorder'>Place Order</StepTitle>} active={step4} disabled={!step4} />
    </Tabs>
  )
}

export default CheckoutSteps
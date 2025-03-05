import LatexMathjaxTester from "../../components/LatexMathjaxTester";
import LatexTester from "../../components/LatexTester";

export default function LatexUji(){
    return (<>
    <div className=" bg-gray-100">
    <LatexTester/>
    </div>
    <div className=" bg-gray-100">
        <LatexMathjaxTester/>
    </div>
    </>)
}
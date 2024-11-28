// HomePage/TypewriterText.js
import TypewriterText from "./TypeWriterText";

export default function TypewriterBox() {
    return (
        <div className="bg-black text-white p-6 rounded-lg h-1/2 mx-auto mt-2" style={{ marginTop: '10px',  marginLeft:'10px', marginRight:'10px' }}>
            <TypewriterText/>
        </div>
    );
}

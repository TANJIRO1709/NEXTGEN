import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TypewriterEffect({
    text,
    setDisable,
}: {
    text: string;
    setDisable: any;
}) {
    const [displayText, setDisplayText] = useState("");
    const [index, setIndex] = useState(0);
    const [showDisclaimer, setShowDisclaimer] = useState(false);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, 5);
            return () => clearTimeout(timeout);
        } else {
            setShowDisclaimer(true);
            setTimeout(() => {
                setDisable(false);
            }, 5000);
        }
    }, [index, text]);

    return (
        <div className="w-full">
            <div className="text-left text-sm sm:text-base md:text-lg lg:text-xl">
                <ReactMarkdown>{displayText}</ReactMarkdown>
            </div>

            <div className="flex items-end justify-end w-full mt-10">
                {showDisclaimer && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.0, ease: "ease" }}
                        className="text-right text-sm "
                    >
                        AI-generated responses may contain errors. Verify with
                        the references below or the NEXTGEN team.
                    </motion.p>
                )}
            </div>
        </div>
    );
}
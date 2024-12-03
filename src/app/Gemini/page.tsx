"use client";
import TypewriterEffect from "../components/ui/common/Typewriter";
import { Button } from "../components/ui/common/button";
import { useState } from "react";
import { Input } from "../components/ui/common/input";
import axios from "axios";

const GeminiAi = () => {
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState<string>("");
    const [noOfResponses, setNoOfResponses] = useState(0);
    const [disable, setDisable] = useState(false);

    async function getResponse(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!prompt) {
            setResponse("");
            return;
        }
        setLoading(true);
        setResponse("");
        setDisable(true);

        try {
            const result = await axios.post(
                process.env.NEXT_PUBLIC_BASE_API_URL + "/api/MakeadreamAI",
                {
                    prompt: prompt,
                }
            );

            setResponse(result.data.response);
            setNoOfResponses(noOfResponses + 1);
        } catch (e: any) {
            console.error(e);
            setNoOfResponses(0);
            setDisable(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <section className="font-lato bg-white shadow-lg rounded-lg p-8 w-[90vw] max-w-2xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">Welcome to Gemini AI</h1>
                <p className="text-center text-gray-600 mb-6">Ask your questions and get instant responses!</p>
                <form
                    onSubmit={getResponse}
                    className="flex flex-col gap-4 mb-6"
                >
                    <Input
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Start Asking..."
                        id="webwizAI"
                        name="prompt"
                        className="border-2 border-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Button
                        type="submit"
                        className="h-10 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                        disabled={loading || disable}
                    >
                        {loading ? "Thinking..." : "Ask"}
                    </Button>
                </form>

                {noOfResponses > 0 && (
                    <div className="bg-[#D4E2D4] bg-opacity-60 rounded-xl py-4 px-6">
                        {response && (
                            <TypewriterEffect
                                text={response}
                                setDisable={setDisable}
                            />
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};

export default GeminiAi;
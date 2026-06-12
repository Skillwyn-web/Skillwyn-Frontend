import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer";
import InterviewQuestions from "@/components/resources/InterviewQuestions";

export default function InterviewQuestionsPage() {
    return (
        <main className="min-h-screen bg-[#050505]">
            <Navbar />
            <InterviewQuestions />
            <Footer />
        </main>
    );
}

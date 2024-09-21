import { Link } from "react-router-dom";

const features = [
    {
        title: "Browse Courses",
        description: "Browse new courses the interests you the most.",
        icon: "🚀",
        linkText: "Read more",
        linkUrl: "/browse"
    },
    {
        title: "My courses",
        description: "Already Bought some? Lest go to your courses.",
        icon: "✏️",
        linkText: "Read more",
        linkUrl: "mycourses"
    },
    {
        title: "My publications",
        description: "Hey, did you know that you can publish your own course now?",
        icon: "🎓",
        linkText: "Read more",
        linkUrl: "publishes"
    },
    {
        title: "Accounts",
        description: "You can magane your acount details here.",
        icon: "🧍🏾",
        linkText: "Read more",
        linkUrl: "account"
    }
];

const FeaturesSection = () => {
    return (
        <section className="p-20 pb-96 text-white cursor-pointer">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-4">A technology-first approach to Education</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                    Welcome to Upgrade, an innovative online learning platform offering diverse, expert-crafted courses to empower learners worldwide. Accessible education for all, from technology to personal development. Join us today!
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-zinc-200 rounded-lg p-6 text-center">
                            <Link to={feature.linkUrl}>
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-zinc-500">{feature.title}</h3>
                                <p className="text-gray-400 mb-4">{feature.description}</p>
                                <div className="text-orange-500 hover:underline">
                                    {feature.linkText} <span className="inline-block transform transition-transform duration-200 hover:translate-x-1">→</span>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
import { Head, Link } from "@inertiajs/react";
import { IconAlertTriangle, IconTool, IconMapPin } from "@tabler/icons-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 text-white">
            <Head title="Welcome" />
            <header className="container mx-auto px-4 py-6 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <IconAlertTriangle className="h-8 w-8" />
                    <span className="text-2xl font-bold">RoadSafe</span>
                </div>
                <Link
                    href="/login"
                    className="bg-white text-orange-500 px-4 py-2 rounded-full font-semibold hover:bg-orange-100 transition-colors"
                >
                    Login
                </Link>
            </header>

            <main className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
                {/* Text Section */}
                <div className="md:w-1/2 w-full pr-0 md:pr-8 mb-8 md:mb-0 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        Road sign maintenance
                    </h1>
                    <p className="text-lg md:text-xl mb-8">
                        Ensuring safety on the roads through expert maintenance
                        and timely updates of all traffic signs. Our dedicated
                        team works round the clock to keep your streets clearly
                        marked and hazard-free.
                    </p>
                    <Link
                        href="/login"
                        className="bg-white text-orange-500 px-6 md:px-8 py-2 md:py-3 rounded-full font-semibold text-lg hover:bg-orange-100 transition-colors inline-block"
                    >
                        Get started!
                    </Link>
                </div>

                <div className="md:w-1/2 w-full relative h-64 md:h-96 flex justify-center items-center">
                    <div className="w-5/6 h-full md:w-full md:h-full relative border-2 border-white rounded-xl overflow-hidden">
                        <img
                            src="/images/landing.png"
                            alt="Road sign"
                            className="object-cover w-full h-full filter drop-shadow-lg"
                        />
                    </div>

                    <div className="absolute -top-16 right-0">
                        <IconTool className="h-8 md:h-16 w-8 md:w-16 text-yellow-300" />
                    </div>
                    <div className="absolute -bottom-8 -left-16">
                        <IconMapPin className="h-8 md:h-16 w-8 md:w-16 text-red-300" />
                    </div>
                </div>
            </main>
        </div>
    );
}

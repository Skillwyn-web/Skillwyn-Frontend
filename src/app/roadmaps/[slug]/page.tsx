import RoadmapDetail from "@/components/roadmaps/RoadmapDetail";

type Props = {
    params: Promise<{
        slug: string
    }>
}

export default async function RoadmapDetailPage({ params }: Props) {
    const { slug } = await params;
    return <RoadmapDetail slug={slug} />;
}

import { getExerciseById } from "@/services/db/exercises";
import parseVideoIdFromUrl from "@/utils/parse-video-id-from-video";

export default async function Page({ params }: { params: { id: string } }) {
  const exercise = await getExerciseById(params.id);

  return (
    <section>
      <h1 className="text-4xl font-bold mb-10">{exercise?.name}</h1>
      <div className="flex gap-5 flex-wrap text-primary">
        Target muscles:{" "}
        <p className="flex flex-wrap gap-4 ">
          {exercise?.primaryMuscles.map((muscle) => (
            <span key={muscle}>{muscle}</span>
          ))}
        </p>
      </div>
      {!!exercise?.secondaryMuscles.length && (
        <div className="flex gap-5 flex-wrap text-secondary">
          Secondary muscles:{" "}
          <p className="flex flex-wrap gap-4">
            {" "}
            {exercise?.secondaryMuscles.map((muscle) => (
              <span key={muscle}>{muscle}</span>
            ))}
          </p>
        </div>
      )}
      <div className="mb-5 text-default-300">
        <p>Force: {exercise?.force}</p>
        <p>Equipment: {exercise?.equipment}</p>
        <p>Category: {exercise?.category}</p>
      </div>

      {exercise?.instructions && (
        <div>
          <h2 className="text-xl font-medium mb-5">Instructions</h2>
          <p>{exercise.instructions}</p>
        </div>
      )}
      {!!exercise?.images.length && (
        <div>
          {exercise.images.map((imageUrl) => {
            return (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={`${exercise.name}'s image`}
              />
            );
          })}
        </div>
      )}
      {exercise?.videoUrl && (
        <div>
          <iframe
            title="video"
            width="100%"
            height="415"
            src={`https://www.youtube.com/embed/${parseVideoIdFromUrl(
              exercise.videoUrl
            )}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </section>
  );
}

export default function GladwellBlock(props: {title: string, description: string, features: Array<{name: string, description: string}>}) {
  //console.log(JSON.stringify(json))
    return (
        <div className="bg-bg1 mt-24 sm:mt-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-title sm:text-4xl font-font2">{props.title}</h2>
          <p className="mt-6 text-lg leading-8 text-text">
            {props.description}
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base leading-7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.features.map((feature) => (
            <div key={feature.name}>
              <dt className="font-semibold text-title font-font2">{feature.name}</dt>
              <dd className="mt-1 text-text">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
    )
}
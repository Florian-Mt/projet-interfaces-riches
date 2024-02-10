import classNames from "classnames"

import { Keyword } from "@/signatures.ts"

type KeywordsProps = {
	className?: string
	keywords: Keyword | null
}

const Keywords = ({className, keywords}: KeywordsProps) => {
	return <div className={classNames(className, "grow flex gap-1 justify-center items-center")}>
		{keywords?.data.map(keyword => <a key={keyword.url} href={keyword.url} className="bg-blue-100 text-blue-800 text-xs font-medium px-1.5 py-0.5 rounded">{keyword.title}</a>)}
	</div>
}

export default Keywords

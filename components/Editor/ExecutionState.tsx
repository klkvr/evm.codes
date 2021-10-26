import { useContext } from 'react'

import cn from 'classnames'

import { EthereumContext } from 'context/ethereumContext'

import { toKeyIndex } from 'util/string'

import { StackBox } from 'components/ui'

type RowProps = {
  label: string
  value: string[] | string | undefined
}

const ExecutionStateRow = ({ label, value }: RowProps) => {
  const values =
    !value || value.length === 0
      ? ['']
      : Array.isArray(value)
      ? value
      : ([value] as string[])

  return (
    <>
      <dt className="mb-1 text-gray-400 font-medium uppercase">{label}</dt>
      <dd className="font-mono mb-2">
        {values.map((value: string, index: number) => (
          <StackBox
            key={toKeyIndex(label, index)}
            isFullWidth
            showEmpty
            value={value ? value.toString() : ''}
            className={cn('break-all border-gray-600')}
          />
        ))}
      </dd>
    </>
  )
}

const ExecutionState = () => {
  const { executionState } = useContext(EthereumContext)
  const { memory, stack, storage } = executionState

  return (
    <div>
      <dl className="text-2xs">
        <ExecutionStateRow label="Memory" value={memory} />
        <ExecutionStateRow label="Stack" value={stack} />

        <dt className="mb-1 text-gray-400 font-medium uppercase">Storage</dt>
        <dd>
          <div
            className="inline-block border border-gray-600 px-2 py-1 mb-1 w-full"
            style={{ minHeight: 26 }}
          >
            <dl>
              {storage.map(({ address, slot, value }, index) => (
                <div key={`storage-${index}`}>
                  <ExecutionStateRow label="Contract" value={address} />
                  <ExecutionStateRow label="Slot" value={slot} />
                  <ExecutionStateRow label="Value" value={value} />
                </div>
              ))}
            </dl>
          </div>
        </dd>
      </dl>
    </div>
  )
}

export default ExecutionState

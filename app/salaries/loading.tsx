import { Container } from '@/components/ui/container';

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-[#EBEBEB]">
      <td className="px-4 py-4">
        <div className="h-4 w-32 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-40 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-24 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-16 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="h-4 w-20 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="ml-auto h-4 w-24 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="ml-auto h-4 w-28 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="ml-auto h-4 w-16 rounded-full bg-[#EBEBEB]" />
      </td>
      <td className="px-4 py-4">
        <div className="mx-auto h-6 w-20 rounded-full bg-[#EBEBEB]" />
      </td>
    </tr>
  );
}

export default function Loading() {
  return (
    <Container className="py-6 sm:py-8 lg:py-10">
      <div className="mb-6 space-y-3">
        <div className="h-8 w-72 rounded-full bg-[#EBEBEB]" />
        <div className="h-5 w-full max-w-2xl rounded-full bg-[#EBEBEB]" />
      </div>

      <div className="mb-6 rounded-3xl border border-[#EBEBEB] bg-white p-4">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="h-11 rounded-xl bg-[#F7F7F7]" />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="h-11 rounded-xl bg-[#F7F7F7]" />
            <div className="h-11 rounded-xl bg-[#F7F7F7]" />
            <div className="h-11 rounded-xl bg-[#F7F7F7]" />
            <div className="h-11 rounded-xl bg-[#F7F7F7]" />
            <div className="h-11 rounded-xl bg-[#F7F7F7]" />
            <div className="h-11 rounded-xl bg-[#F7F7F7]" />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#EBEBEB] bg-white">
        <table className="min-w-full divide-y divide-[#EBEBEB]">
          <thead className="bg-[#F7F7F7]">
            <tr>
              <th className="px-4 py-4 text-left">
                <div className="h-3 w-20 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-3 w-16 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-3 w-16 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-3 w-16 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-left">
                <div className="h-3 w-20 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-right">
                <div className="ml-auto h-3 w-24 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-right">
                <div className="ml-auto h-3 w-28 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-right">
                <div className="ml-auto h-3 w-24 rounded-full bg-[#EBEBEB]" />
              </th>
              <th className="px-4 py-4 text-center">
                <div className="mx-auto h-3 w-20 rounded-full bg-[#EBEBEB]" />
              </th>
            </tr>
          </thead>
          <tbody>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </tbody>
        </table>
      </div>
    </Container>
  );
}

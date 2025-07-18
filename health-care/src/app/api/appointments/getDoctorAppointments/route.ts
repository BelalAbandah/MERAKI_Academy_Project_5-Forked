import { GetDoctorAppoitments } from "@/models/lib/db/services/appointment";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (id) {
      const result = await GetDoctorAppoitments(+id);
      if (result?.length === 0) {
        return NextResponse.json(
          { message: `Error there is no any appointments for ${id}` },
          {
            status: 404,
          }
        );
      } else {
        return NextResponse.json(result, {
          status: 200,
        });
      }
    } else {
      return NextResponse.json(
        { message: `Error the query does not exist` },
        {
          status: 404,
        }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(
      { message: `Failed ${error.message}` },
      {
        status: 404,
      }
    );
  }
};

import { usePage } from "@inertiajs/react";
import Submit from "@/Components/Attendance/Submit";
import Submitted from "@/Components/Attendance/Submitted";

export default function Attendance() {
    const { submitted } = usePage().props;

    if (submitted) {
        return <Submitted />; // info sudah absensi
    } else {
        return <Submit />; // form absensi
    }
}

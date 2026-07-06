import * as React from "react"
import { cn } from "@/lib/utils"

function Table({ className, ...props }) {
  return (
    // Pembungkus luar otomatis memberikan efek rounded-xl, shadow tipis, dan border sesuai tabel customer
    <div data-slot="table-container" className="w-full bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full text-left border-collapse text-sm", className)}
        {...props} />
    </div>
  );
}

function TableHeader({ className, ...props }) {
  return (
    <thead
      data-slot="table-header"
      // Latar belakang header otomatis abu-abu terang (gray-50) dengan garis pembatas bawah
      className={cn("bg-gray-50 border-b border-gray-100", className)}
      {...props} />
  );
}

function TableBody({ className, ...props }) {
  return (
    <tbody
      data-slot="table-body"
      // Otomatis memberikan garis pembatas horizontal tipis (divide-y) antar baris data
      className={cn("divide-y divide-gray-100 text-gray-700", className)}
      {...props} />
  );
}

function TableFooter({ className, ...props }) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t bg-gray-50/50 font-medium text-gray-600 [&>tr]:last:border-b-0", className)}
      {...props} />
  );
}

function TableRow({ className, ...props }) {
  return (
    <tr
      data-slot="table-row"
      // Efek transisi warna hover yang halus saat baris disorot (hover:bg-gray-50/70)
      className={cn(
        "transition-colors hover:bg-gray-50/70 data-[state=selected]:bg-gray-100",
        className
      )}
      {...props} />
  );
}

function TableHead({ className, ...props }) {
  return (
    <th
      data-slot="table-head"
      // Padding vertikal 4 (py-4) & horizontal 6 (px-6), teks kecil kapital (text-xs font-bold), warna abu-abu (text-gray-400)
      className={cn(
        "py-4 px-6 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap align-middle",
        className
      )}
      {...props} />
  );
}

function TableCell({ className, ...props }) {
  return (
    <td
      data-slot="table-cell"
      // Jarak padding baris data yang lega dan rapi (py-4 px-6) sesuai tabel customer
      className={cn(
        "py-4 px-6 align-middle whitespace-nowrap text-sm",
        className
      )}
      {...props} />
  );
}

function TableCaption({ className, ...props }) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("p-4 text-xs text-gray-400 text-center", className)}
      {...props} />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
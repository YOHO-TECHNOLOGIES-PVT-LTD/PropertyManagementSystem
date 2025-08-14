"use client"

import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent } from "../../components/ui/card"
import { X, BarChart3 } from "lucide-react"

interface NewRequestFormProps {
  onClose: () => void
  onSubmit: (request: {
    title: string
    description: string
    category: string
    assignedTo: string
    estimatedCost: number
    status: "Open" | "In Progress" | "Completed" | "Urgent"
    priority: "Low" | "Medium" | "High"
  }) => void
}

export default function NewRequestForm({ onClose, onSubmit }: NewRequestFormProps) {
  const [newRequest] = useState({
    title: "",
    description: "",
    category: "",
    assignedTo: "",
    estimatedCost: 0,
    status: "Open" as "Open" | "In Progress" | "Completed" | "Urgent",
    priority: "Medium" as "Low" | "Medium" | "High",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(newRequest)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl bg-white rounded-2xl shadow-xl">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900">Maintenance Details</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X className="w-5 h-5 text-gray-600" />
            </Button>
          </div>

          {/* Personal Information Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input
                    name="fullName"
                    defaultValue="John Doe"
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-600"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                  <Input
                    name="unit"
                    defaultValue="Unit 101"
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-600"
                    
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <Input
                    name="category"
                    defaultValue="Hvac"
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-600"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Created</label>
                  <Input
                    defaultValue="Feb 7, 2024"
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-600"
                    
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled</label>
                  <Input
                    name="scheduled"
                    defaultValue="Feb 10, 2024"
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-600"
                    
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Input
                    defaultValue="Completed"
                    className="h-12 bg-gray-50 border-gray-200 rounded-xl text-gray-600"
                    
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl h-12"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, X, RotateCcw, Zap } from "lucide-react"

interface CameraScannerProps {
  onScanComplete: (imageData: string) => void
  onClose: () => void
}

export function CameraScanner({ onScanComplete, onClose }: CameraScannerProps) {
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Start Camera
  const startCamera = useCallback(async () => {
    try {
      setError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // back camera for phones
        },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      streamRef.current = stream
      setIsStreaming(true)
      setHasPermission(true)
    } catch (err) {
      console.error(err)
      setError("Unable to access camera. Please allow permission.")
      setHasPermission(false)
    }
  }, [])

  // Stop Camera
  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setIsStreaming(false)
  }, [])

  // Capture Image
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return
    const canvas = canvasRef.current
    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      const imageData = canvas.toDataURL("image/png")
      onScanComplete(imageData)
    }
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera()
  }, [stopCamera])

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Camera Scanner</CardTitle>
        <Button size="sm" variant="ghost" onClick={() => { stopCamera(); onClose() }}>
          <X className="w-5 h-5" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Video Preview */}
        <div className="relative bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-64 object-cover"
          />
          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="flex justify-center gap-2">
          {!isStreaming ? (
            <Button onClick={startCamera} className="bg-green-600 hover:bg-green-700">
              <Camera className="w-4 h-4 mr-2" /> Start Camera
            </Button>
          ) : (
            <>
              <Button onClick={captureImage} className="bg-blue-600 hover:bg-blue-700">
                <Zap className="w-4 h-4 mr-2" /> Capture
              </Button>
              <Button onClick={stopCamera} variant="destructive">
                <RotateCcw className="w-4 h-4 mr-2" /> Restart
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
